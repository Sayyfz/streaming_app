import express from "express";
import usersRoutes from "./api/usersRoutes";
import moviesRoutes from "./api/moviesRoutes";
import ratingRoutes from "./api/ratingRoutes";

const routes = express.Router();

routes.use("/users", usersRoutes);
routes.use("/movies", moviesRoutes);
routes.use("/rating", ratingRoutes);

export default routes;
