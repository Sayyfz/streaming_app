import { Router } from "express";
import * as controllers from "../../handlers/movies";

const moviesRoute = Router();

moviesRoute.get("/", controllers.index);
moviesRoute.post("/", controllers.create);
moviesRoute.get("/:id", controllers.show);
moviesRoute.patch("/:id", controllers.update);
moviesRoute.delete("/:id", controllers.remove);

export default moviesRoute;
