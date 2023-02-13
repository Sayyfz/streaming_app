import { Router } from "express"
import * as controllers from "../../handlers/like"

const LikeRoute = Router()

LikeRoute.post("/", controllers.create)
LikeRoute.get("/", controllers.index)
export default LikeRoute
