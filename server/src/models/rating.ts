import db from "../db"
import { throwError } from "../helpers/error.helpers"
import { Rating } from "../types"

export class RatingStore {
    async create(r: Rating): Promise<Rating> {
        const connection = await db.connect()
        try {
            const { user_id, movie_id, rating, comment } = r
            const sql = `INSERT INTO movies_rating (user_id, movie_id, rating, comment ) 
      values ($1, $2, $3, $4) RETURNING *`
            const result = await connection.query(sql, [
                user_id,
                movie_id,
                rating,
                comment,
            ])

            console.log(result.rows[0])

            return result.rows[0]
        } catch (err) {
            throwError(`Cannot create rating ${err}`, 422)
        } finally {
            connection.release()
        }
    }
}


export default RatingStore
