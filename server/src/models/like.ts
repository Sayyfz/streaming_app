import db from "../db"
import { throwError } from "../helpers/error.helpers"
import Like from "../types/like"

export class LikeStore {
    async create(l: Like): Promise<Like> {
        const connection = await db.connect()
        try {
            const { movie_id } = l
            const sql = `INSERT INTO most_liked (movie_id) 
      values ($1) RETURNING *`
            const result = await connection.query(sql, [movie_id])

            console.log(result.rows[0])

            return result.rows[0]
        } catch (err) {
            throwError(`Cannot like the movie ${err}`, 422)
        } finally {
            connection.release()
        }
    }
    async index(): Promise<Like[]> {
        const connection = await db.connect()
        try {
            const sql = `SELECT COUNT(most_liked.id) as likes,movies.name
                            FROM most_liked
                            INNER JOIN movies ON movies.id = most_liked.movie_id
                            GROUP BY most_liked.movie_id, movies.name ORDER BY likes DESC`
            const result = await connection.query(sql)
            return result.rows
        } catch (err) {
            throwError(`Cannot get most_liked movies ${err}`, 422)
        } finally {
            connection.release()
        }
    }
}


export default LikeStore
