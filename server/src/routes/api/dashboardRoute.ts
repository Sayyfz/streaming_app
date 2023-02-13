import { Router } from "express"
import * as dashboard from "../../handlers/services/dashboard"

const dashboardRoute = Router()

dashboardRoute.get("/most_liked", dashboard.getMostLiked)

export default dashboardRoute
