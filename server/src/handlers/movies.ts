import store from "../models/movie"
import { NextFunction, Request, Response } from "express"
import validation from "../helpers/validation"
import { throwError } from "../helpers/error.helpers"
import resizeImage from "../utilities/sharp"
import { postersPath } from "../path"

export const index = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { page, limit } = req.query
        const pageQuery = page ? parseInt(req.query.page as string) : 1
        const limitQuery = limit ? parseInt(req.query.limit as string) : 2

        const startIndex = (pageQuery - 1) * limitQuery
        const endIndex = pageQuery * limitQuery
        let next

        const movies = await store.index(startIndex, limitQuery)

        const fullCount =
            movies.length > 0 ? (movies[0].full_count as number) : (0 as number)
        if (endIndex < fullCount) {
            next = pageQuery + 1
        }

        return res.status(200).json({
            status: "success",
            results: fullCount,
            next,
            movies,
        })
    } catch (err) {
        next(err)
    }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movie = await store.show(req.params.id)
        return res.status(200).json(movie)
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
        validation({ name: req.body.name }).isNotEmpty()
        validation({ release_date: req.body.release_date }).isNotEmpty()
        const file = req.file

        if (!file) {
            throwError("Please upload poster image", 422)
        }

        const poster_image = await resizeImage(
            file.buffer,
            300,
            500,
            postersPath
        )

        const movie = await store.create({
            ...req.body,
            poster_image,
        })
        return res.status(201).json(movie)
    } catch (err) {
        next(err)
    }
}

export const update = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = req.body
        const file = req.file

        let poster_image
        if (file) {
            poster_image = await resizeImage(file.buffer, 300, 500, postersPath)
            data.poster_image = poster_image
        }

        const movie = await store.update(req.body, req.params.id)
        return res.status(200).json(movie)
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
        const movie = await store.delete(req.params.id)
        return res.status(200).json(movie)
    } catch (err) {
        next(err)
    }
}
