import { RatingStore } from "../models/rating";
import { NextFunction, Request, Response } from "express";
import validation from "../helpers/validation";

const store = new RatingStore();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rating = await store.create(req.body);
    return res.status(201).json(rating);
  } catch (err) {
    next(err);
  }
};
