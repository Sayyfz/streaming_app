import express from "express";
import usersRoutes from "./api/userRoutes";
import moviesRoutes from "./api/moviesRoutes";

const routes = express.Router();

routes.use("/users", usersRoutes);
routes.use("/movies", moviesRoutes);

export default routes;
