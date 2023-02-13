import { Router } from "express"
import * as controllers from "../../handlers/rating"
import validateParamsId from "../../middleware/validateParamsId"

const ratingRoute = Router()

ratingRoute.get("/movies/:id", validateParamsId, controllers.show)
ratingRoute.post("/", controllers.create)

export default ratingRoute
