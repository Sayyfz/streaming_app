"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authOwnership = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authOwnership = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        const payload = jsonwebtoken_1.default.decode(token);
        if (payload.id != req.params.id) {
            throw "AuthErr: You are not authroized to do this action";
        }
        next();
    }
    catch (err) {
        return res.status(401).json(`An error occured: ${err}`);
    }
};
exports.authOwnership = authOwnership;
exports.default = exports.authOwnership;
