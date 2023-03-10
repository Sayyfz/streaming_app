import { NextFunction, Request, Response } from "express"
import store from "../models/user"
import jwt from "jsonwebtoken"
import validate from "../helpers/validation"
import config from "../config"

export const index = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await store.index()
        return res.status(200).json(users)
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
        validate({ email: req.body.email }).required().isEmail()
        validate({ password: req.body.password }).required().passwordStrength()

        const user = await store.create(req.body)

        return res.status(201).json(user)
    } catch (err) {
        next(err)
    }
}

export const show = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await store.show(res.locals.userId)
        return res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

export const update = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body
    try {
        validate({ email }).isEmail().isNotEmpty()
        validate({ password }).passwordStrength().isNotEmpty()

        const newUser = await store.update(req.body, res.locals.userId)
        return res.status(200).json(newUser)
    } catch (err) {
        next(err)
    }
}

export const remove = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await store.delete(res.locals.userId as string)
        return res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await store.login(req.body)

        const token = jwt.sign(
            { id: user?.id },
            config.tokenSecretKey as unknown as string
        )

        return res.status(200).json(token)
    } catch (err) {
        return next(err)
    }
}

export const addToList = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userMovie = {
            user_id: res.locals.userId,
            movie_id: req.body.movie_id,
        }
        validate({ id: req.body.movie_id }).isNotEmpty().isNum()
        const movie = await store.add_to_list(userMovie)
        return res.status(200).json(movie)
    } catch (err) {
        return next(err)
    }
}
