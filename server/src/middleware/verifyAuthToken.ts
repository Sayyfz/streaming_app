import { NextFunction } from "connect"
import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response } from "express"
import config from "../config"

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization as string

        if (!authHeader) {
            throw Error("please login")
        }
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(
            token,
            config.tokenSecretKey as string
        ) as JwtPayload
        res.locals.userId = decoded.user.id
        next()
    } catch (err) {
        return res.status(401).json(`An error occurred: ${err}`)
    }
}

export default verifyAuthToken
