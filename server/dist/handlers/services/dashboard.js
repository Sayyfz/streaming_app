"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMostLiked = void 0;
const dashboard_1 = __importDefault(require("../../models/dashboard"));
const getMostLiked = async (req, res, next) => {
    try {
        const mostLikedList = await dashboard_1.default.getMostLiked();
        return res.status(200).json(mostLikedList);
    }
    catch (err) {
        next(err);
    }
};
exports.getMostLiked = getMostLiked;
