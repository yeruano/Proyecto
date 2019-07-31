import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

// importing all routes
import indexRoutes from './routes/IndexRoutes';

// initialization
const app = express();

// middlewares
dotenv.config();
app.use(morgan('dev'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

// routes
app.use(indexRoutes);

export default app;
