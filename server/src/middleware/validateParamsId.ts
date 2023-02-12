import { NextFunction } from "connect"
import { Request, Response } from "express"

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

export default validateParamsId
