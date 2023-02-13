"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { NODE_ENV, SECRET_BCYPT_KEY, SALT_ROUNDS, SECRET_Token_kEY, PORT, BASEURL, } = process.env;
function env(key, defaultValue = "") {
    return process.env[key] ?? defaultValue;
}
exports.default = {
    env,
    BASEURL,
    PORT,
    NODE_ENV,
    pepperKey: SECRET_BCYPT_KEY,
    salt: SALT_ROUNDS,
    tokenSecretKey: SECRET_Token_kEY,
};
