import { MovieStore } from "../models/movies";
import { NextFunction, Request, Response } from "express";
import validation from "../helpers/validation";

const store = new MovieStore();

export const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movies = await store.index();
    return res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await store.show(req.params.id);
    return res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validation("dsadsad").isEmail;
    const movie = await store.create(req.body);
    return res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movie = await store.update(req.body, req.params.id);
    return res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
};
export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movie = await store.delete(req.params.id);
    return res.status(200).json(movie);
  } catch (err) {
    next(err);
  }
};
