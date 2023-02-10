import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

const secret = process.env.SECRET_TOKEN_KEY as string

export const validateParamsId = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (isNaN(+req.params.id)) {
        return res.status(400).json(`Please specify a valid id`)
    }
    next()
}

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

export const authOwnership = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization as string
        const token = authHeader.split(" ")[1]
        const payload = jwt.decode(token) as JwtPayload

        if (payload.id !== +req.params.id) {
            throw "AuthErr: You are not authroized to do this action"
        }
        next()
    } catch (err) {
        return res.status(401).json(`An error occured: ${err}`)
    }
}
