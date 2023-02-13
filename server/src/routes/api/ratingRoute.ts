import { Router } from "express"
import * as controllers from "../../handlers/rating"
import verifyAuthToken from "../../middleware/verifyAuthToken"

const ratingRoute = Router()

ratingRoute.post("/", verifyAuthToken, controllers.create)

export default ratingRoute
