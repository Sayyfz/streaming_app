import query from "../helpers/query.helpers"
import db from "../db"
import { throwError } from "../helpers/error.helpers"
import { FavouriteMovie, User } from "../types"
import { comparePassword, encodePassword } from "../helpers/encodePassword"

class UserStore {
    async index(): Promise<User[]> {
        const conn = await db.connect()
        try {
            const sql = query.select(
                ["id, email, created_at, updated_at"],
                "users"
            )
            const result = await conn.query(sql)
            if (!result.rows.length) {
                throw Error("No users found")
            }
            return result.rows
        } catch (err) {
            throwError((err as Error).message, 422)
        } finally {
            conn.release()
        }
    }

    async create(user: User): Promise<User> {
        const conn = await db.connect()

        try {
            const existSql = query.exist("users", "email")
            const existResult = await conn.query(existSql, [user.email])
            if (existResult.rows[0].exist) {
                throw Error("Email already exists")
            }

            const insertSql = query.insert(
                "users",
                [user],
                ["id, email, created_at, updated_at"]
            )
            const result = await db.query(insertSql.sql, [
                user.email,
                encodePassword(user.password as string),
            ])

            return result.rows[0]
        } catch (err) {
            throwError((err as Error).message, 422)
        } finally {
            conn.release()
        }
    }

    async show(id: string): Promise<User> {
        const conn = await db.connect()
        try {
            const sql = query.select(
                ["id, email, created_at, updated_at"],
                "users",
                ["id"]
            )
            const result = await conn.query(sql, [id])

            if (!result.rows.length) {
                throw Error("User does not exist")
            }

            return result.rows[0]
        } catch (err) {
            throwError((err as Error).message, 422)
        } finally {
            conn.release()
        }
    }

    async update(user: User, id: string): Promise<User> {
        const conn = await db.connect()
        try {
            const existSql = query.exist("users", "email")
            const existResult = await conn.query(existSql, [user.email])
            if (existResult.rows[0].exist) {
                throw Error("Email already exists")
            }
            if (user.password) {
                user.password = encodePassword(user.password as string)
            }

            const { sql, values } = query.update("users", user, [
                "id, email, created_at, updated_at",
            ])
            const result = await conn.query(sql, [...values, id])
            if (!result.rows.length) {
                throw Error("User not found")
            }

            return result.rows[0]
        } catch (err) {
            throwError((err as Error).message, 422)
        } finally {
            conn.release()
        }
    }

    async delete(id: string): Promise<User> {
        const conn = await db.connect()
        try {
            const deleteSql = query.delete("users", [
                "id, email, created_at, updated_at",
            ])
            const result = await conn.query(deleteSql, [id])

            if (!result.rows.length) {
                throw Error("Cannot find user")
            }

            return result.rows[0]
        } catch (err) {
            throwError((err as Error).message, 422)
        } finally {
            conn.release()
        }
    }

    // login
    async login(user: User): Promise<User> {
        const connection = await db.connect()
        try {
            const sql = query.select(["password"], "users", ["email"])

            const result = await connection.query(sql, [user.email])
            if (!result.rows.length) {
                throw Error("email doesn't exist")
            }
            const { password: hashPassword } = result.rows[0]
            const isPasswordCorrect = comparePassword(
                user.password,
                hashPassword
            )
            if (!isPasswordCorrect) {
                throw Error("Incorrect password")
            }

            const sqlInfo = query.select(["id", "email"], "users", ["email"])

            const userInfo = await connection.query(sqlInfo, [user.email])
            return userInfo.rows[0]
        } catch (error) {
            throw {
                status: 401,
                message: `Unable to login, ${(error as Error).message}`,
                error: new Error(),
            }
        } finally {
            connection.release()
        }
    }

    async add_to_list(userMovie: FavouriteMovie) {
        const connection = await db.connect()
        try {
            const { sql } = query.insert("user_list", [userMovie], ["*"])
            const result = await connection.query(sql, [
                userMovie.user_id,
                userMovie.movie_id,
            ])
            return result.rows[0]
        } catch (err) {
            throwError((err as Error).message, 422)
        } finally {
            connection.release()
        }
    }
}

export default UserStore
