"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersPath = exports.postersPath = exports.srcPath = void 0;
const path_1 = __importDefault(require("path"));
const srcPath = __dirname;
exports.srcPath = srcPath;
const postersPath = path_1.default.join(__dirname, "./public/images/posters");
exports.postersPath = postersPath;
const usersPath = path_1.default.join(__dirname, "./public/images/users");
exports.usersPath = usersPath;
