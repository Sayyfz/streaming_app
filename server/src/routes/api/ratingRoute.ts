import { Router } from "express"
import * as controllers from "../../handlers/rating"

const ratingRoute = Router()

ratingRoute.post("/", controllers.create)

export default ratingRoute
