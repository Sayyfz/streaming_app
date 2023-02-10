import bcrypt from "bcrypt";
import query from "../helpers/query.helpers";
import config from "../config";
import db from "../db";
import { throwError } from "../helpers/error.helpers";
import { User } from "../types";

export class UserStore {
  async index(): Promise<User[]> {
    const conn = await db.connect();
    try {
      const query = `SELECT * FROM users`;
      const result = await conn.query(query);
      if (!result.rows.length) {
        throw Error("No users found");
      }
      return result.rows;
    } catch (err) {
      throwError((err as Error).message, 422);
    } finally {
      conn.release();
    }
  }

  async create(user: User): Promise<User> {
    const conn = await db.connect();

    try {
      const existSql = query.exist("users", "email");
      const existResult = await conn.query(existSql, [user.email]);
      if (existResult.rows[0].exist) {
        throw Error("Email already exists");
      }

      const insertSql = query.insert("users", [user], ["*"]);
      const hash = bcrypt.hashSync(
        user.password + config.env("SECRET_BCRYPT_PASSWORD"),
        parseInt((process.env.BCRYPT_SALT as string) || "10")
      );
      const result = await db.query(insertSql.sql, [user.email, hash]);
      return result.rows[0];
    } catch (err) {
      throwError((err as Error).message, 422);
    } finally {
      conn.release();
    }
  }

  async show(id: string): Promise<User> {
    const conn = await db.connect();

    try {
      const sql = query.select(["*"], "users", ["id"]);
      const result = await conn.query(sql, [id]);
      if (!result.rows.length) {
        throw Error("User does not exist");
      }
      return result.rows[0];
    } catch (err) {
      throwError((err as Error).message, 422);
    } finally {
      conn.release();
    }
  }

  async update(newUser: User, id: string): Promise<User> {
    const conn = await db.connect();

    try {
      const existSql = query.exist("users", "email");
      const existResult = await conn.query(existSql, [newUser.email]);
      if (existResult.rows[0].exist) {
        throw Error("Email already exists");
      }

      const hash = bcrypt.hashSync(
        newUser.password + config.env("SECRET_BCRYPT_PASSWORD"),
        parseInt((process.env.BCRYPT_SALT as string) || "10")
      );
      newUser.password = hash;
      const { sql, values } = query.update("users", newUser, ["*"]);
      const result = await conn.query(sql, [...values, id]);

      if (!result.rows.length) {
        throw Error("User not found");
      }

      return result.rows[0];
    } catch (err) {
      throwError((err as Error).message, 422);
    } finally {
      conn.release();
    }
  }

  async delete(id: string): Promise<User> {
    const conn = await db.connect();
    try {
      const deleteSql = query.delete("users", ["*"]);
      const result = await conn.query(deleteSql, [id]);

      if (!result.rows.length) {
        throw Error("Cannot find user");
      }

      return result.rows[0];
    } catch (err) {
      throwError((err as Error).message, 422);
    } finally {
      conn.release();
    }
  }
}

const getInstance = (() => {
  let instance: UserStore;
  return () => {
    if (instance) return instance;
    return new UserStore();
  };
})();

export default getInstance;
