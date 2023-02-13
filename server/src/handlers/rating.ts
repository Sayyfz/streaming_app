import RatingStore from "../models/rating"
import { NextFunction, Request, Response } from "express"
import validate from "../helpers/validation"

const store = RatingStore() //Singleton Instance

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        validate({ rating: req.body.rating }).isNum()
        validate({ userId: req.body.user_id }).isNum()
        validate({ movieId: req.body.movie_id }).isNum()

        const rating = await store.create(req.body)
        return res.status(201).json(rating)
    } catch (err) {
        next(err)
    }
}
