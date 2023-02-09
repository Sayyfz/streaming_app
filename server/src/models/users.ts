import bcrypt from "bcrypt";
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
}
