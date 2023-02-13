"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const config_1 = __importDefault(require("../config"));
const dbMap = {
    test: "TEST_",
    dev: "DEV_",
};
const prefix = dbMap[config_1.default.NODE_ENV];
const db = new pg_1.Pool({
    host: config_1.default.env(`${prefix}DATABASE_HOST`),
    user: config_1.default.env(`${prefix}DATABASE_USER`),
    password: config_1.default.env(`${prefix}DATABASE_PASSWORD`),
    database: config_1.default.env(`${prefix}DATABASE_NAME`),
    port: parseInt(config_1.default.env(`${prefix}DATABASE_PORT`), 10),
});
exports.default = db;
