import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Environment variables

if (process.env.NODE_ENV !== 'production') {
    
    const result = dotenv.config();

    if (result.error) {
        throw result.error;
    }
    console.log(result.parsed);

}


// Importing all routes
import indexRoutes from './routes/IndexRoutes';

// Initialization
const app = express();

// Archivos publicos
app.use(express.static(path.resolve(__dirname, '../public/dist/client')));

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

// Routes
app.use(indexRoutes);

export default app;
