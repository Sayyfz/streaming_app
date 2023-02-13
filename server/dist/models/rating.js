"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingStore = void 0;
const db_1 = __importDefault(require("../db"));
const error_helpers_1 = require("../helpers/error.helpers");
class RatingStore {
    async create(r) {
        const connection = await db_1.default.connect();
        try {
            const { user_id, movie_id, rating, comment, is_liked } = r;
            const sql = `INSERT INTO movies_rating (user_id, movie_id, rating, comment, is_liked) 
                          VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const result = await connection.query(sql, [
                user_id,
                movie_id,
                rating,
                comment,
                is_liked,
            ]);
            return result.rows[0];
        }
        catch (err) {
            (0, error_helpers_1.throwError)(`Cannot create rating ${err}`, 422);
        }
        finally {
            connection.release();
        }
    }
}
exports.RatingStore = RatingStore;
const rating = new RatingStore();
exports.default = rating;
