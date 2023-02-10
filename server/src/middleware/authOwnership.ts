import { NextFunction } from "connect";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authOwnership = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization as string
        const token = authHeader.split(" ")[1]
        const payload = jwt.decode(token) as JwtPayload

        if (payload.id != req.params.id) {
            throw "AuthErr: You are not authroized to do this action"
        }
        next()
    } catch (err) {
        return res.status(401).json(`An error occured: ${err}`)
    }
}

export default authOwnership