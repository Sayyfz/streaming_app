import express, { NextFunction, Request, Response } from 'express';
import { User, UserStore } from '../models/users';
import jwt, { JwtPayload } from 'jsonwebtoken';
import verifyAuthToken from '../middleware/global';
import validate from '../helpers/validation';
import config from '../config';

const secret = config.env('TOKEN_SECRET');
const store = new UserStore();

export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await store.index();
        return res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const newUser: User = req.body;
    try {
        validate({ email: newUser.email }).isEmail().isNotEmpty();
        validate({ password: newUser.password }).isPassword().isNotEmpty();
        await store.create(newUser);

        const token = jwt.sign({id: newUser.id}, process.env.SECRET_TOKEN_KEY as string);
        console.log(token)
        return res.status(201).json(token);
    } catch (err) {
        next(err);
    }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await store.show(+req.params.id);
        return res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const newUser: User = req.body;
    try {
        validate({ email: newUser.email }).isEmail().isNotEmpty();
        validate({ password: newUser.password }).isPassword().isNotEmpty();
        const user = await store.update(newUser, +req.params.id);
        return res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await store.delete(+req.params.id);
        return res.status(200).json(user)
    } catch (err) {
        next(err);
    }
}
