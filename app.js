import express from 'express';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './Routes/authRoutes.js';

const app = express();

app.use(express.json());
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);

export default app;