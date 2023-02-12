import db from "../db";
import  like  from "../types/like";

export class Like {
  async create(l: like) {
    const connection = await db.connect();
    try {
      const { movie_id} = l;
      const sql = `INSERT INTO most_liked (movie_id) 
      values ($1) RETURNING *`;
      const result = await connection.query(sql, [
        movie_id
      ]);

      console.log(result.rows[0]);

      return result.rows[0];
    } catch (err) {
      console.log(err);
    } finally {
      connection.release();
    }
  }async getall(l: like) {
    const connection = await db.connect();
    try {
      const sql = `select count(most_liked.id) as liked,movies.name
      from most_liked
      inner join movies on movies.id = most_liked.movie_id
      group by most_liked.movie_id`;
      const result = await connection.query(sql);
      console.log(result.rows[0]);
      return result.rows[0];
    } catch (err) {
      console.log(err);
    } finally {
      connection.release();
    }
  }
}
