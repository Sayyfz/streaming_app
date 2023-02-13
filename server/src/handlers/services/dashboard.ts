import { NextFunction, Request, Response } from "express"
import store from "../../models/dashboard"

export const getMostLiked = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const mostLikedList = await store.getMostLiked()
        return res.status(200).json(mostLikedList)
    } catch (err) {
        next(err)
    }
}
