"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieStore = void 0;
const db_1 = __importDefault(require("../db"));
const error_helpers_1 = require("../helpers/error.helpers");
const query_helpers_1 = __importDefault(require("../helpers/query.helpers"));
const config_1 = __importDefault(require("../config"));
const filesController_1 = require("../utilities/filesController");
const path_1 = require("../path");
class MovieStore {
    // get all movies
    async index(startIndex, limit) {
        const connection = await db_1.default.connect();
        try {
            const host = `${config_1.default.BASEURL}images/posters/`;
            const sql = `SELECT  count(*) OVER( )  AS full_count, m.id,m.name, m.release_date,m.created_at, m.updated_at, concat($1::text,m.poster_image) as poster_image,
              count(mr.*),coalesce(floor( count(mr.*)::float / sum(mr.rating)::float * 100 )::integer,0 ) as rating
              FROM movies AS m
              LEFT JOIN movies_rating AS mr on m.id = mr.movie_id 
              GROUP BY m.id
              OFFSET $2 ROWS FETCH first $3 ROW ONLY
              `;
            const result = await connection.query(sql, [
                host,
                startIndex,
                limit,
            ]);
            return result.rows;
        }
        catch (err) {
            (0, error_helpers_1.throwError)(`Cannot get movies,  ${err.message}`, 422);
        }
        finally {
            connection.release();
        }
    }
    // get movie by id
    async show(id) {
        const connection = await db_1.default.connect();
        try {
            const host = `${config_1.default.BASEURL}images/posters/`;
            const sql = `select m.id,m.name, m.release_date,m.created_at, m.updated_at,concat($1::text,m.poster_image),
            count(mr.*), coalesce(floor( count(mr.*)::float / sum(mr.rating)::float  * 100 )::integer,0 ) as rating
            from movies as m
            left join movies_rating as mr on m.id = mr.movie_id 
            where m.id = $2
            group by m.id
            `;
            const result = await connection.query(sql, [host, id]);
            if (!result.rows.length) {
                throw Error("Movie not found");
            }
            return result.rows[0];
        }
        catch (error) {
            (0, error_helpers_1.throwError)(`Could not find movie,  ${error.message}`, 422);
        }
        finally {
            connection.release();
        }
    }
    // add movie
    async create(movie) {
        const connection = await db_1.default.connect();
        try {
            const { name } = movie;
            const existsql = query_helpers_1.default.exist("movies", "name");
            const existMovie = await connection.query(existsql, [name]);
            if (existMovie.rows[0].exist) {
                throw Error("Movie name already exists");
            }
            const { sql, values } = query_helpers_1.default.insert("movies", [movie], ["*"]);
            const result = await connection.query(sql, [...values]);
            return result.rows[0];
        }
        catch (error) {
            (0, error_helpers_1.throwError)(`Could not create movie,  ${error.message}`, 422);
        }
        finally {
            connection.release();
        }
    }
    // update movie
    async update(movie, id) {
        const connection = await db_1.default.connect();
        try {
            const { name, poster_image } = movie;
            if (poster_image) {
                const sql = query_helpers_1.default.select(["poster_image"], "movies", ["id"]);
                const result = await connection.query(sql, [id]);
                const filePath = `${path_1.postersPath}/${result.rows[0].poster_image}`;
                (0, filesController_1.deleteImage)(filePath);
            }
            if (name) {
                const existsql = query_helpers_1.default.exist("movies", "name");
                const existMovie = await connection.query(existsql, [name]);
                if (existMovie.rows[0].exist) {
                    throw Error("Movie name already exists");
                }
            }
            const { sql, values } = query_helpers_1.default.update("movies", movie, ["*"]);
            const result = await connection.query(sql, [...values, id]);
            if (!result.rows.length) {
                throw Error("Movie not found");
            }
            return result.rows[0];
        }
        catch (error) {
            if (movie.poster_image) {
                const filePath = `${path_1.postersPath}/${movie.poster_image}`;
                (0, filesController_1.deleteImage)(filePath);
            }
            (0, error_helpers_1.throwError)(`Could not update movie,  ${error.message}`, 422);
        }
        finally {
            connection.release();
        }
    }
    // delete movie
    async delete(id) {
        const connection = await db_1.default.connect();
        try {
            await db_1.default.query("BEGIN");
            const sql = query_helpers_1.default.delete("movies", ["*"]);
            const result = await connection.query(sql, [id]);
            if (!result.rows.length) {
                throw Error("movie not found");
            }
            const filePath = `${path_1.postersPath}/${result.rows[0].poster_image}`;
            (0, filesController_1.deleteImage)(filePath);
            await db_1.default.query("COMMIT");
            return result.rows[0];
        }
        catch (error) {
            await db_1.default.query("ROLLBACK");
            (0, error_helpers_1.throwError)(`Could not delete movie,  ${error.message}`, 422);
        }
        finally {
            connection.release();
        }
    }
}
exports.MovieStore = MovieStore;
const movie = new MovieStore();
exports.default = movie;
