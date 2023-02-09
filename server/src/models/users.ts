import bcrypt from "bcrypt";
import query from "../helpers/query.helpers";
import config from "../config";
import db from "../db";
import { throwError } from "../helpers/error.helpers";

export type User = {
  id?: number;
  email: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    const conn = await db.connect();
    try {
      const query = `SELECT * FROM users`;
      const result = await conn.query(query);
      conn.release();
      return result.rows;
    } catch (err) {
      throwError(`Cannot get users ${err}`, 422);
    } finally {
      conn.release();
    }
  }

  async create(user: User): Promise<User> {
    const conn = await db.connect();

    try {
      const existSql = query.exist('users', 'email');
      const existResult = await conn.query(existSql, [user.email])
      if(existResult.rows.length) {
        throw Error('email already exists')
      }

      const insertSql = query.insert('users', [user], ['*'])
      const hash = bcrypt.hashSync(user.password + config.env('BCRYPT_PASSWORD'), config.env('SALT_ROUNDS'))
      const result = await db.query(insertSql.sql, [user.email, hash])
      return result.rows[0];

    } catch (err) {
      throwError(`Cannot create user ${err}`, 422)
    } finally {
      conn.release()
    }
  }
}
