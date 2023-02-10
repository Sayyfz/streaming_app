import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET_TOKEN_KEY as string;

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization as string;
    if(!authHeader) {
      throw Error('Auth token required')
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret);
    next();
  } catch (err) {
    res.status(401);
    res.json(`An error occurred: ${err}`);
    return;
  }
};

export default verifyAuthToken;
