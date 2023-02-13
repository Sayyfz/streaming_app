import store from "../models/rating"
import { NextFunction, Request, Response } from "express"
import validate from "../helpers/validation"

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        validate({ rating: req.body.rating }).isNum()
        validate({ movieId: req.body.movie_id }).isNum()

        const rating = await store.create({
            ...req.body,
            user_id: res.locals.userId,
        })
        return res.status(201).json(rating)
    } catch (err) {
        next(err)
    }
}
