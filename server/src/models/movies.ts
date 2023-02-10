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
      // "SELECT * FROM movies"
      const sql = query.select(["*"], "movies");

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
      const { name } = movie;
      const existsql = query.exist("movies", "name");
      const existMovie = await connection.query(existsql, [name]);
      if (existMovie.rows[0].exist) {
        throw Error("Movie name already exists");
      }

      const now = new Date();

      const sql = `INSERT INTO movies ( name, release_date ) 
      values ($1, $2) RETURNING *`;

      const result = await connection.query(sql, [name, now]);

      return {
        id: result.rows[0].id,
        name: result.rows[0].name,
        release_date: dateFormat(result.rows[0].release_date),
      };
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
