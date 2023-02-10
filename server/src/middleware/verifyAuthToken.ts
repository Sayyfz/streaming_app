import { NextFunction } from "connect"
import jwt from 'jsonwebtoken'
import { Request, Response } from "express"

const secret = process.env.SECRET_TOKEN_KEY as string

export const verifyAuthToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization as string
        if (!authHeader) {
            throw Error("Auth token required")
        }
        const token = authHeader.split(" ")[1]
        jwt.verify(token, secret)
        next()
    } catch (err) {
        return res.status(401).json(`An error occurred: ${err}`)
    }
}