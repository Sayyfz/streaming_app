import Like from "../models/like"
import { NextFunction, Request, Response } from "express"

const store = new Like() //Singleton instance

export const index = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const mostLikedList = await store.index()
        return res.status(200).json(mostLikedList)
    } catch (err) {
        next(err)
    }
}

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const liked = await store.create(req.body)
        return res.status(201).json(liked)
    } catch (err) {
        next(err)
    }
}
