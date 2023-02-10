import db from "../db";
import { Rating } from "../types";

export class RatingStore {
  async create(r: Rating) {
    const connection = await db.connect();
    try {
      const { user_id, movie_id, rating, comment } = r;
      const sql = `INSERT INTO movies_rating (user_id, movie_id, rating, comment ) 
      values ($1, $2, $3, $4) RETURNING *`;
      const result = await connection.query(sql, [
        user_id,
        movie_id,
        rating,
        comment,
      ]);

      console.log(result.rows[0]);

      return result.rows[0];
    } catch (err) {
      console.log(err);
    } finally {
      connection.release();
    }
  }
}
