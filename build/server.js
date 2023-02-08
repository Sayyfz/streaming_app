"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// import user_routes from './handlers/users';
const app = (0, express_1.default)();
const address = '0.0.0.0:3000';
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
// user_routes(app)
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
