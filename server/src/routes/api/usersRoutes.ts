import { Router } from "express";
import * as controllers from "../../handlers/users";

const usersRoute = Router();

usersRoute.get("/", controllers.index);
usersRoute.get("/:id", controllers.show);
usersRoute.post("/", controllers.create)
usersRoute.patch("/:id", controllers.update)
usersRoute.delete("/:id", controllers.remove)

export default usersRoute;
