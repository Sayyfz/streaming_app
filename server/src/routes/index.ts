import express from "express"
import usersRoutes from "./api/userRoute"
import moviesRoutes from "./api/movieRoute"
import ratingRoutes from "./api/ratingRoute"
import dashboardRoute from "./api/dashboardRoute"

const routes = express.Router()

routes.use("/users", usersRoutes)
routes.use("/movies", moviesRoutes)
routes.use("/rating", ratingRoutes)
routes.use("/dashboard", dashboardRoute)
export default routes
