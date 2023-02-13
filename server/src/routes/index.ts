import express from "express"
import usersRoutes from "./api/user"
import moviesRoutes from "./api/movie"
import ratingRoutes from "./api/rating"
import likesRoutes from "./api/like"

const routes = express.Router()

routes.use("/users", usersRoutes)
routes.use("/movies", moviesRoutes)
routes.use("/rating", ratingRoutes)
routes.use("/most_liked", likesRoutes)
export default routes
