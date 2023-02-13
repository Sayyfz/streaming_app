"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
//Globals
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
//Third Party Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "./public")));
//Endpoints Routes
app.use("/api", routes_1.default);
//Main Endpoint
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.use((_req, res, Next) => {
    try {
        throw Error("ohh you are lost");
    }
    catch (err) {
        Next(err);
    }
});
app.use(error_middleware_1.default);
app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
exports.default = app;
