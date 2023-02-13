"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.show = exports.index = void 0;
const movie_1 = __importDefault(require("../models/movie"));
const validation_1 = __importDefault(require("../helpers/validation"));
const error_helpers_1 = require("../helpers/error.helpers");
const sharp_1 = __importDefault(require("../utilities/sharp"));
const path_1 = require("../path");
const index = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const pageQuery = page ? parseInt(req.query.page) : 1;
        const limitQuery = limit ? parseInt(req.query.limit) : 2;
        const startIndex = (pageQuery - 1) * limitQuery;
        const endIndex = pageQuery * limitQuery;
        let next;
        const movies = await movie_1.default.index(startIndex, limitQuery);
        const fullCount = movies.length > 0 ? movies[0].full_count : 0;
        if (endIndex < fullCount) {
            next = pageQuery + 1;
        }
        return res.status(200).json({
            status: "success",
            results: fullCount,
            next,
            movies,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.index = index;
const show = async (req, res, next) => {
    try {
        const movie = await movie_1.default.show(req.params.id);
        return res.status(200).json(movie);
    }
    catch (err) {
        next(err);
    }
};
exports.show = show;
const create = async (req, res, next) => {
    try {
        (0, validation_1.default)({ name: req.body.name }).isNotEmpty();
        (0, validation_1.default)({ release_date: req.body.release_date }).isNotEmpty();
        const file = req.file;
        if (!file) {
            (0, error_helpers_1.throwError)("Please upload poster image", 422);
        }
        const poster_image = await (0, sharp_1.default)(file.buffer, 300, 500, path_1.postersPath);
        const movie = await movie_1.default.create({
            ...req.body,
            poster_image,
        });
        return res.status(201).json(movie);
    }
    catch (err) {
        next(err);
    }
};
exports.create = create;
const update = async (req, res, next) => {
    try {
        const data = req.body;
        const file = req.file;
        let poster_image;
        if (file) {
            poster_image = await (0, sharp_1.default)(file.buffer, 300, 500, path_1.postersPath);
            data.poster_image = poster_image;
        }
        const movie = await movie_1.default.update(req.body, req.params.id);
        return res.status(200).json(movie);
    }
    catch (err) {
        next(err);
    }
};
exports.update = update;
const remove = async (req, res, next) => {
    try {
        const movie = await movie_1.default.delete(req.params.id);
        return res.status(200).json(movie);
    }
    catch (err) {
        next(err);
    }
};
exports.remove = remove;
