"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./api/userRoute"));
const movieRoute_1 = __importDefault(require("./api/movieRoute"));
const ratingRoute_1 = __importDefault(require("./api/ratingRoute"));
const dashboardRoute_1 = __importDefault(require("./api/dashboardRoute"));
const routes = express_1.default.Router();
routes.use("/users", userRoute_1.default);
routes.use("/movies", movieRoute_1.default);
routes.use("/rating", ratingRoute_1.default);
routes.use("/dashboard", dashboardRoute_1.default);
exports.default = routes;
