import { Router } from "express";
import * as controllers from "../../handlers/users";
import { authOwnership, validateParamsId, verifyAuthToken } from "../../middleware/global";

const usersRoute = Router();

usersRoute.get("/", verifyAuthToken, controllers.index);
usersRoute.get("/:id", validateParamsId, verifyAuthToken, controllers.show);
usersRoute.post("/", controllers.create)
usersRoute.patch("/:id", validateParamsId, authOwnership, verifyAuthToken, controllers.update)
usersRoute.delete("/:id", validateParamsId, authOwnership, verifyAuthToken, controllers.remove)

export default usersRoute;
