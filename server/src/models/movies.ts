import db from "../db"
import { throwError } from "../helpers/error.helpers"
import query from "../helpers/query.helpers"
import { Movie } from "../types"
import config from "../config"
import { deleteImage } from "../utilities/filesController"

export class MovieStore {
    // get all movies
    async index(startIndex: number, limit: number): Promise<Movie[]> {
        const connection = await db.connect()
        try {
            const host = `${config.BASEURL}images/posters/`

            const sql = `SELECT  count(*) OVER( )  AS full_count, m.id,m.name, m.release_date,m.created_at, m.updated_at, concat($1::text,m.poster_image) as poster_image,
              count(mr.*),coalesce(floor( count(mr.*)::float / sum(mr.rating)::float * 100 )::integer,0 ) as rating
              FROM movies AS m
              LEFT JOIN movies_rating AS mr on m.id = mr.movie_id 
              GROUP BY m.id
              OFFSET $2 ROWS FETCH first $3 ROW ONLY
              `

            const result = await connection.query(sql, [
                host,
                startIndex,
                limit,
            ])

            return result.rows
        } catch (err) {
            throwError(`Cannot get movies,  ${(err as Error).message}`, 422)
        } finally {
            connection.release()
        }
    }

    // get movie by id
    async show(id: string): Promise<Movie> {
        const connection = await db.connect()
        try {
            const host = `${config.BASEURL}images/posters/`

            const sql = `select m.id,m.name, m.release_date,m.created_at, m.updated_at,concat($1::text,m.poster_image),
            count(mr.*), coalesce(floor( count(mr.*)::float / sum(mr.rating)::float  * 100 )::integer,0 ) as rating
            from movies as m
            left join movies_rating as mr on m.id = mr.movie_id 
            where m.id = $2
            group by m.id
            `
            const result = await connection.query(sql, [host, id])

            if (!result.rows.length) {
                throw Error("Movie not found")
            }

            return result.rows[0]
        } catch (error) {
            throwError(
                `Could not find movie,  ${(error as Error).message}`,
                422
            )
        } finally {
            connection.release()
        }
    }
    // add movie
    async create(movie: Movie): Promise<Movie> {
        const connection = await db.connect()
        try {
            const { name } = movie
            const existsql = query.exist("movies", "name")
            const existMovie = await connection.query(existsql, [name])
            if (existMovie.rows[0].exist) {
                throw Error("Movie name already exists")
            }

            const { sql, values } = query.insert("movies", [movie], ["*"])
            const result = await connection.query(sql, [...values])

            return result.rows[0]
        } catch (error) {
            throwError(
                `Could not create movie,  ${(error as Error).message}`,
                422
            )
        } finally {
            connection.release()
        }
    }

    // update movie
    async update(movie: Movie, id: string): Promise<Movie> {
        const connection = await db.connect()
        try {
            const { name, poster_image } = movie

            console.log("poster_image", poster_image)

            if (poster_image) {
                const sql = query.select(["poster_image"], "movies", [
                    "poster_image",
                ])
                const result = await connection.query(sql, [poster_image])

                console.log(
                    "result.rows[0].poster_image",
                    result.rows[0].poster_image
                )

                deleteImage(result.rows[0].poster_image)
            }

            if (name) {
                const existsql = query.exist("movies", "name")
                const existMovie = await connection.query(existsql, [name])
                if (existMovie.rows[0].exist) {
                    throw Error("Movie name already exists")
                }
            }

            const { sql, values } = query.update("movies", movie, ["*"])

            const result = await connection.query(sql, [...values, id])

            console.log(result.rows.length)

            if (!result.rows.length) {
                throw Error("Movie not found")
            }
            return result.rows[0]
        } catch (error) {
            throwError(
                `Could not update product,  ${(error as Error).message}`,
                422
            )
        } finally {
            connection.release()
        }
    }

    // delete movie
    async delete(id: string): Promise<Movie> {
        const connection = await db.connect()
        try {
            const sql = query.delete("movies", ["*"])

            const result = await connection.query(sql, [id])
            if (!result.rows.length) {
                throw Error("movie not found")
            }

            deleteImage(result.rows[0].poster_image)

            return result.rows[0]
        } catch (error) {
            throwError(
                `Could not delete movie,  ${(error as Error).message}`,
                422
            )
        } finally {
            connection.release()
        }
    }
}

const getInstance = (() => {
    let instance: MovieStore
    return () => {
        if (instance) return instance
        return new MovieStore()
    }
})()

export default getInstance
