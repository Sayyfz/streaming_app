import { Router } from "express"
import * as controllers from "../../handlers/movies"
import upload from "../../utiles/multer"

const moviesRoute = Router()

moviesRoute.get("/", controllers.index)
moviesRoute.post("/", upload.single("image"), controllers.create)
moviesRoute.get("/:id", controllers.show)
moviesRoute.patch("/:id", upload.single("image"), controllers.update)
moviesRoute.delete("/:id", controllers.remove)

export default moviesRoute
