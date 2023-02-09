import { Router } from "express";
import * as controllers from "../../handlers/users";

const usersRoute = Router();

usersRoute.get("/", controllers.index);

export default usersRoute;
