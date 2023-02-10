import { Router } from "express";
import * as controllers from "../../handlers/users";
import verifyAuthToken from "../../middleware/verifyAuthToken";
import validateParamsId from "../../middleware/validateParamsId";

const usersRoute = Router();

usersRoute.get("/", verifyAuthToken, controllers.index);
usersRoute.get("/:id", validateParamsId, verifyAuthToken, controllers.show)
usersRoute.post("/", controllers.create)
usersRoute.patch("/", validateParamsId, verifyAuthToken, controllers.update)
usersRoute.delete("/", validateParamsId, verifyAuthToken, controllers.remove)

export default usersRoute;
