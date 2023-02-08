import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRoute from './routes/usersRoute';

dotenv.config();

//Globals
const app: express.Application = express();
const port = process.env.PORT || 5000;

//Third Party Middlewares
app.use(cors());
app.use(bodyParser.json());

//Endpoints Routes
app.use('/users', usersRoute);

//Main Endpoint
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
});

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
