import express from "express"
import usersRoutes from "./api/user.routes"
import moviesRoutes from "./api/movie.routes"
import ratingRoutes from "./api/rating.routes"
import likesRoutes from "./api/like.routes"

const routes = express.Router()

routes.use("/users", usersRoutes)
routes.use("/movies", moviesRoutes)
routes.use("/rating", ratingRoutes)
routes.use("/most_liked", likesRoutes)
export default routes
