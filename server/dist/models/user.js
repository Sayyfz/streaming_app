"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_helpers_1 = __importDefault(require("../helpers/query.helpers"));
const db_1 = __importDefault(require("../db"));
const error_helpers_1 = require("../helpers/error.helpers");
const encodePassword_1 = require("../helpers/encodePassword");
class UserStore {
    async index() {
        const conn = await db_1.default.connect();
        try {
            const sql = query_helpers_1.default.select(["id, email, created_at, updated_at"], "users");
            const result = await conn.query(sql);
            if (!result.rows.length) {
                throw Error("No users found");
            }
            return result.rows;
        }
        catch (err) {
            (0, error_helpers_1.throwError)(err.message, 422);
        }
        finally {
            conn.release();
        }
    }
    async create(user) {
        const conn = await db_1.default.connect();
        try {
            const existSql = query_helpers_1.default.exist("users", "email");
            const existResult = await conn.query(existSql, [user.email]);
            if (existResult.rows[0].exist) {
                throw Error("Email already exists");
            }
            const insertSql = query_helpers_1.default.insert("users", [user], ["id, email, created_at, updated_at"]);
            const result = await db_1.default.query(insertSql.sql, [
                user.email,
                (0, encodePassword_1.encodePassword)(user.password),
            ]);
            return result.rows[0];
        }
        catch (err) {
            (0, error_helpers_1.throwError)(err.message, 422);
        }
        finally {
            conn.release();
        }
    }
    async show(id) {
        const conn = await db_1.default.connect();
        try {
            const sql = query_helpers_1.default.select(["id, email, created_at, updated_at"], "users", ["id"]);
            const result = await conn.query(sql, [id]);
            if (!result.rows.length) {
                throw Error("User does not exist");
            }
            return result.rows[0];
        }
        catch (err) {
            (0, error_helpers_1.throwError)(err.message, 422);
        }
        finally {
            conn.release();
        }
    }
    async update(user, id) {
        const conn = await db_1.default.connect();
        try {
            const existSql = query_helpers_1.default.exist("users", "email");
            const existResult = await conn.query(existSql, [user.email]);
            if (existResult.rows[0].exist) {
                throw Error("Email already exists");
            }
            const { sql, values } = query_helpers_1.default.update("users", { ...user, password: (0, encodePassword_1.encodePassword)(user.password) }, ["id, email, created_at, updated_at"]);
            const result = await conn.query(sql, [...values, id]);
            if (!result.rows.length) {
                throw Error("User not found");
            }
            return result.rows[0];
        }
        catch (err) {
            (0, error_helpers_1.throwError)(err.message, 422);
        }
        finally {
            conn.release();
        }
    }
    async delete(id) {
        const conn = await db_1.default.connect();
        try {
            const deleteSql = query_helpers_1.default.delete("users", [
                "id, email, created_at, updated_at",
            ]);
            const result = await conn.query(deleteSql, [id]);
            if (!result.rows.length) {
                throw Error("Cannot find user");
            }
            return result.rows[0];
        }
        catch (err) {
            (0, error_helpers_1.throwError)(err.message, 422);
        }
        finally {
            conn.release();
        }
    }
    // login
    async login(user) {
        const connection = await db_1.default.connect();
        try {
            const sql = "SELECT password FROM users WHERE email=$1";
            const result = await connection.query(sql, [user.email]);
            if (!result.rows.length) {
                throw Error("email doesn't exist");
            }
            const { password: hashPassword } = result.rows[0];
            const isPasswordCorrect = (0, encodePassword_1.comparePassword)(user.password, hashPassword);
            if (!isPasswordCorrect) {
                throw Error("Incorrect password");
            }
            const userInfo = await connection.query("SELECT id, email  FROM users WHERE email=($1)", [user.email]);
            return userInfo.rows[0];
        }
        catch (error) {
            throw {
                status: 401,
                message: `Unable to login, ${error.message}`,
                error: new Error(),
            };
        }
        finally {
            connection.release();
        }
    }
    async add_to_list(userMovie) {
        const connection = await db_1.default.connect();
        try {
            const { sql } = query_helpers_1.default.insert("user_list", [userMovie], ["*"]);
            const result = await connection.query(sql, [
                userMovie.user_id,
                userMovie.movie_id,
            ]);
            return result.rows[0];
        }
        catch (err) {
            (0, error_helpers_1.throwError)(err.message, 422);
        }
        finally {
            connection.release();
        }
    }
}
const user = new UserStore();
exports.default = user;
