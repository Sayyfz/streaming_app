import bcrypt from "bcrypt"
import query from "../helpers/query.helpers"
import config from "../config"
import db from "../db"
import { throwError } from "../helpers/error.helpers"
import { User } from "../types"

const encodePassword = (password: string): string => {
    const saltRound = parseInt(config.salt as string, 10)
    return bcrypt.hashSync(`${password}${config.pepperKey}`, saltRound)
}

export class UserStore {
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

            const insertSql = query.insert("users", [user], ["id, email"])
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
            console.log("id", id)

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

            const { sql, values } = query.update(
                "users",
                { ...user, password: encodePassword(user.password as string) },
                ["id, email, created_at, updated_at"]
            )
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
    async login(user: User): Promise<User | null> {
        const connection = await db.connect()
        try {
            const sql = "SELECT password FROM users WHERE email=$1"

            const result = await connection.query(sql, [user.email])
            if (!result.rows.length) {
                throw Error("email not exist")
            }
            const { password: hashPassword } = result.rows[0]
            const isPasswordValid = bcrypt.compareSync(
                `${user.password}${config.pepperKey}`,
                hashPassword
            )
            if (!isPasswordValid) {
                throw Error("password not valid")
            }
            const userInfo = await connection.query(
                "SELECT id, email  FROM users WHERE email=($1)",
                [user.email]
            )
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
}

export default UserStore
