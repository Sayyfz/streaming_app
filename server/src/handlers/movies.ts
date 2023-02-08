import { MovieStore } from '../models/movies';
import { Request, Response } from 'express';

const store = new MovieStore();

export const index = async (req: Request, res: Response) => {
    try {
        const movies = await store.index();
        return res.status(200).json(movies);
    } catch (err) {
        return res.status(400).json((err as Error).message);
    }
};
