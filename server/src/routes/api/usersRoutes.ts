import { Router } from "express";
import * as controllers from "../../handlers/users";
import verifyAuthToken from "../../middleware/global";

const usersRoute = Router();

usersRoute.get("/", verifyAuthToken, controllers.index);
usersRoute.get("/:id", verifyAuthToken, controllers.show);
usersRoute.post("/", controllers.create)
usersRoute.patch("/:id", verifyAuthToken, controllers.update)
usersRoute.delete("/:id", verifyAuthToken, controllers.remove)

export default usersRoute;
