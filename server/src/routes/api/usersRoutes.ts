import { Router } from "express"
import * as controllers from "../../handlers/users"
import verifyAuthToken from "../../middleware/verifyAuthToken"
import validateParamsId from "../../middleware/validateParamsId"

const usersRoute = Router()

usersRoute.get("/", verifyAuthToken, controllers.index)
usersRoute.get("/profile", verifyAuthToken, controllers.show)
usersRoute.post("/", controllers.create)
usersRoute.patch("/", verifyAuthToken, controllers.update)
usersRoute.delete("/", verifyAuthToken, controllers.remove)
usersRoute.post("/auth", controllers.login)

export default usersRoute
