import { Router } from "express"
import * as controllers from "../../handlers/movies"
import verifyAuthToken from "../../middleware/verifyAuthToken"
import upload from "../../utilities/multer"

const moviesRoute = Router()

moviesRoute.get("/", controllers.index)
moviesRoute.post(
    "/",
    verifyAuthToken,
    upload.single("image"),
    controllers.create
)
moviesRoute.get("/:id", controllers.show)
moviesRoute.patch(
    "/:id",
    verifyAuthToken,
    upload.single("image"),
    controllers.update
)
moviesRoute.delete("/:id", verifyAuthToken, controllers.remove)

export default moviesRoute
