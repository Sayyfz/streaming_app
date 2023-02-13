import express from "express"
import usersRoutes from "./api/userRoutes"
import moviesRoutes from "./api/movieRoutes"
import ratingRoutes from "./api/ratingRoutes"
import likesRoutes from "./api/likeRoutes"

const routes = express.Router()

routes.use("/users", usersRoutes)
routes.use("/movies", moviesRoutes)
routes.use("/rating", ratingRoutes)
routes.use("/most_liked", likesRoutes)
export default routes
