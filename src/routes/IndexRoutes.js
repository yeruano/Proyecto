import express from 'express';
import userRoutes from './UserRoutes';

const app = express();

app.use('/api/users', userRoutes);

export default app;
