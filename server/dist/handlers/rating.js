"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const rating_1 = __importDefault(require("../models/rating"));
const validation_1 = __importDefault(require("../helpers/validation"));
const create = async (req, res, next) => {
    try {
        (0, validation_1.default)({ rating: req.body.rating }).isNum().range(5, 1);
        (0, validation_1.default)({ movieId: req.body.movie_id }).isNum();
        const rating = await rating_1.default.create({
            ...req.body,
            user_id: res.locals.userId,
        });
        return res.status(201).json(rating);
    }
    catch (err) {
        next(err);
    }
};
exports.create = create;
