import express from 'express';
import { index } from '../handlers/users';

const usersRoute = express.Router();

usersRoute.get('/', index);

export default usersRoute;
