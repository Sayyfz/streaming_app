import db from "../db"
import { throwError } from "../helpers/error.helpers"

class DashboardQueries {
    async getMostLiked(): Promise<unknown[]> {
        const connection = await db.connect()
        try {
            const sql = `SELECT movies.name title, SUM(CASE WHEN is_liked THEN 1 ELSE 0 END) as likes
            FROM movies_rating
            INNER JOIN movies ON movies_rating.movie_id = movies.id
            GROUP BY title
            ORDER BY likes DESC`
            const result = await connection.query(sql)
            return result.rows
        } catch (err) {
            throwError(`Cannot get most_liked movies ${err}`, 422)
        } finally {
            connection.release()
        }
    }
}

const dashboard = new DashboardQueries()

export default dashboard
