import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/users';
import jwt, { JwtPayload } from 'jsonwebtoken';
import verifyAuthToken from '../middleware/global';

const secret = process.env.TOKEN_SECRET as string;
const store = new UserStore();

export const index = async (req: Request, res: Response) => {
    try {
        const users = await store.index();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(400).json((err as Error).message);
    }
};
