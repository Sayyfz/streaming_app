"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToList = exports.login = exports.remove = exports.update = exports.show = exports.create = exports.index = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_1 = __importDefault(require("../helpers/validation"));
const config_1 = __importDefault(require("../config"));
const index = async (_req, res, next) => {
    try {
        const users = await user_1.default.index();
        return res.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
};
exports.index = index;
const create = async (req, res, next) => {
    try {
        (0, validation_1.default)({ email: req.body.email }).required().isEmail();
        (0, validation_1.default)({ password: req.body.password }).required().passwordStrength();
        const user = await user_1.default.create(req.body);
        return res.status(201).json(user);
    }
    catch (err) {
        next(err);
    }
};
exports.create = create;
const show = async (_req, res, next) => {
    try {
        const user = await user_1.default.show(res.locals.userId);
        return res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
};
exports.show = show;
const update = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        (0, validation_1.default)({ email }).isEmail().isNotEmpty();
        (0, validation_1.default)({ password }).passwordStrength().isNotEmpty();
        const newUser = await user_1.default.update(req.body, res.locals.userId);
        return res.status(200).json(newUser);
    }
    catch (err) {
        next(err);
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    try {
        const user = await user_1.default.delete(res.locals.userId);
        return res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
};
exports.remove = remove;
const login = async (req, res, next) => {
    try {
        const user = await user_1.default.login(req.body);
        const token = jsonwebtoken_1.default.sign({ id: user?.id }, config_1.default.tokenSecretKey);
        return res.status(200).json(token);
    }
    catch (err) {
        return next(err);
    }
};
exports.login = login;
const addToList = async (req, res, next) => {
    try {
        const userMovie = {
            user_id: res.locals.userId,
            movie_id: req.body.movie_id,
        };
        (0, validation_1.default)({ id: req.body.movie_id }).isNotEmpty().isNum();
        const movie = await user_1.default.add_to_list(userMovie);
        return res.status(200).json(movie);
    }
    catch (err) {
        return next(err);
    }
};
exports.addToList = addToList;
