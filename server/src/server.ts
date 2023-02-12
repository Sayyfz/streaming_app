import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import routes from "./routes"
import errorMiddleware from "./middleware/error.middleware"
import path from "path"

dotenv.config()

//Globals
const app: express.Application = express()

const port = process.env.PORT || 5000

//Third Party Middlewares
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, "./public")))

//Endpoints Routes
app.use("/api", routes)

//Main Endpoint
app.get("/", function (req: Request, res: Response) {
    res.send("Hello World!")
})

app.use((_req: Request, res: Response, Next: NextFunction) => {
    try {
        throw Error("ohh you are lost")
    } catch (err) {
        Next(err)
    }
})

app.use(errorMiddleware)

app.listen(port, function () {
    console.log(`Listening on port ${port}`)
})

export default app
