import express from 'express';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './Routes/authRoutes.js';
import studentsRoutes from './routes/studentRoutes.js';
import teachersRoutes from './routes/teacherRoutes.js';

const app = express();

app.use(express.json());
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/students',studentsRoutes);
app.use('/api/teachers',teachersRoutes);

export default app;