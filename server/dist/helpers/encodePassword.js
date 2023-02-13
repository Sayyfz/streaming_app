"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.encodePassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const encodePassword = (password) => {
    const saltRound = parseInt(config_1.default.salt, 10);
    return bcrypt_1.default.hashSync(`${password}${config_1.default.pepperKey}`, saltRound);
};
exports.encodePassword = encodePassword;
const comparePassword = (tryPassword, realPassword) => {
    return bcrypt_1.default.compareSync(`${tryPassword}${config_1.default.pepperKey}`, realPassword);
};
exports.comparePassword = comparePassword;
