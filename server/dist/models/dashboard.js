"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const error_helpers_1 = require("../helpers/error.helpers");
class DashboardQueries {
    async getMostLiked() {
        const connection = await db_1.default.connect();
        try {
            const sql = `SELECT movies.name title, SUM(CASE WHEN is_liked THEN 1 ELSE 0 END) as likes
            FROM movies_rating
            INNER JOIN movies ON movies_rating.movie_id = movies.id
            GROUP BY title
            ORDER BY likes DESC`;
            const result = await connection.query(sql);
            return result.rows;
        }
        catch (err) {
            (0, error_helpers_1.throwError)(`Cannot get most_liked movies ${err}`, 422);
        }
        finally {
            connection.release();
        }
    }
}
const dashboard = new DashboardQueries();
exports.default = dashboard;
