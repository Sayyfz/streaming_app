import { Like } from "../models/like";
import { NextFunction, Request, Response } from "express";

const like = new Like();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const liked = await like.create(req.body);
    return res.status(201).json(liked);
  } catch (err) {
    next(err);
  }
};
export const getall = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const liked = await like.getall(req.body);
      return res.status(201).json(liked);
    } catch (err) {
      next(err);
    }
  };
  