import { Router } from "express"
import * as controllers from "../../handlers/users"
import verifyAuthToken from "../../middleware/verifyAuthToken"

const usersRoute = Router()

usersRoute.get("/", verifyAuthToken, controllers.index)
usersRoute.get("/profile", verifyAuthToken, controllers.show)
usersRoute.post("/", controllers.create)
usersRoute.patch("/", verifyAuthToken, controllers.update)
usersRoute.delete("/", verifyAuthToken, controllers.remove)
usersRoute.post("/auth", controllers.login)
usersRoute.post("/movies", verifyAuthToken, controllers.addToList)

export default usersRoute
