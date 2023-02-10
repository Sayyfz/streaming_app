import db from "../db";
import { dateFormat } from "../helpers/dateFormat";
import { throwError } from "../helpers/error.helpers";
import query from "../helpers/query.helpers";
import { Movie } from "../types";

export class MovieStore {
  // get all movies
  async index(): Promise<Movie[]> {
    const connection = await db.connect();
    try {
      const sql = `SELECT m.id,m.name, m.release_date, m.poster_image,count(mr.*),
      coalesce(floor( count(mr.*)::float / sum(mr.rating)::float  * 100 )::integer,0 ) as rating
      FROM movies AS m
      LEFT JOIN movies_rating AS mr on m.id = mr.movie_id 
      GROUP BY m.id`;

      const result = await connection.query(sql);

      return result.rows;
    } catch (err) {
      throwError(`Cannot get movies,  ${(err as Error).message}`, 422);
    } finally {
      connection.release();
    }
  }

  // get movie by id
  async show(id: string): Promise<Movie> {
    const connection = await db.connect();
    try {
      const sql = query.select(["*"], "movies", ["id"]);

      const result = await connection.query(sql, [id]);

      if (!result.rows.length) {
        throw Error("Movie not found");
      }

      return result.rows[0];
    } catch (error) {
      throwError(`Could not find movie,  ${(error as Error).message}`, 422);
    } finally {
      connection.release();
    }
  }
  // add movie
  async create(movie: Movie): Promise<Movie> {
    const connection = await db.connect();
    try {
      const { name, release_date, poster_image } = movie;
      const existsql = query.exist("movies", "name");
      const existMovie = await connection.query(existsql, [name]);
      if (existMovie.rows[0].exist) {
        throw Error("Movie name already exists");
      }

      console.log("poster_image", poster_image);

      const sql = `INSERT INTO movies ( name, release_date,poster_image ) 
      values ($1, $2, $3) RETURNING *`;

      const result = await connection.query(sql, [
        name,
        release_date,
        poster_image,
      ]);

      return result.rows[0];
    } catch (error) {
      throwError(`Could not create movie,  ${(error as Error).message}`, 422);
    } finally {
      connection.release();
    }
  }

  // update movie
  async update(movie: Movie, id: string): Promise<Movie> {
    const connection = await db.connect();
    try {
      const { name } = movie;

      if (name) {
        const existsql = query.exist("movies", "name");
        const existMovie = await connection.query(existsql, [name]);
        if (existMovie.rows[0].exist) {
          throw Error("Movie name already exists");
        }
      }

      const { sql, values } = query.update("movies", movie, ["*"]);

      const result = await connection.query(sql, [...values, id]);

      console.log(result.rows.length);

      if (!result.rows.length) {
        throw Error("Movie not found");
      }
      return result.rows[0];
    } catch (error) {
      throwError(`Could not update product,  ${(error as Error).message}`, 422);
    } finally {
      connection.release();
    }
  }

  // delete movie
  async delete(id: string): Promise<Movie> {
    const connection = await db.connect();
    try {
      const sql = query.delete("movies", ["*"]);
      console.log(sql);
      const result = await connection.query(sql, [id]);
      if (!result.rows.length) {
        throw Error("movie not found");
      }
      return result.rows[0];
    } catch (error) {
      throwError(`Could not delete movie,  ${(error as Error).message}`, 422);
    } finally {
      connection.release();
    }
  }
}

const getInstance = (() => {
  let instance: MovieStore;
  return () => {
    if (instance) return instance;
    return new MovieStore();
  };
})();

export default getInstance;
