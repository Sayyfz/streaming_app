import db from "../db"
import { throwError } from "../helpers/error.helpers"
import { Rating } from "../types"

export class RatingStore {
    async show(id: number | string): Promise<Rating[]> {
        const connection = await db.connect()
        try {
            const sql = `SELECT * FROM movies_rating WHERE movie_id=($1)`
            const result = await connection.query(sql, [id])

            return result.rows
        } catch (err) {
            throwError(`Cannot show rating ${err}`, 422)
        }
    }

    async create(r: Rating): Promise<Rating> {
        const connection = await db.connect()
        try {
            const { user_id, movie_id, rating, comment } = r
            const sql = `INSERT INTO movies_rating (user_id, movie_id, rating, comment ) 
                          VALUES ($1, $2, $3, $4) RETURNING *`
            const result = await connection.query(sql, [
                user_id,
                movie_id,
                rating,
                comment,
            ])

            return result.rows[0]
        } catch (err) {
            throwError(`Cannot create rating ${err}`, 422)
        } finally {
            connection.release()
        }
    }
}

const getInstance = (() => {
    let instance: RatingStore
    return () => {
        if (instance) return instance
        return new RatingStore()
    }
})()

export default getInstance
