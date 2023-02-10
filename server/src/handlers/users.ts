import { NextFunction, Request, Response } from 'express';
import { User, UserStore } from '../models/users';
import jwt from 'jsonwebtoken';
import validate from '../helpers/validation';
import config from '../config';
import { throwError } from '../helpers/error.helpers';

const secret = config.env('SECRET_TOKEN_KEY');
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
        const { id } =  await store.create(newUser);

        const token = jwt.sign({id}, secret as string);
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
    const { email, password } = req.body;
    try {
        if(!email && !password) throwError('Please provide email and password to update', 400);
        if(email) validate({ email }).isEmail().isNotEmpty();
        if(password) validate({ password }).isPassword().isNotEmpty();

        const user = { email, password }
        const newUser = await store.update(user, +req.params.id);
        return res.status(200).json(newUser);
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
