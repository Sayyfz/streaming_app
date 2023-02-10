import { NextFunction } from "connect"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response } from "express"

const secret = process.env.SECRET_TOKEN_KEY as string

const verifyAuthToken = (
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
        const decoded = jwt.verify(token, secret) as JwtPayload;
        res.locals.userId = decoded.id
        console.log(res.locals);
        next()
    } catch (err) {
        return res.status(401).json(`An error occurred: ${err}`)
    }
}

export default verifyAuthToken