import express from 'express';
import { index } from '../handlers/movies';

const moviesRoute = express.Router();

moviesRoute.get('/', index);

export default moviesRoute;
