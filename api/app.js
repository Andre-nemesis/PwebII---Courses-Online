import express from 'express';
import authRoutes from './Routes/authRoutes.js';
import studentsRoutes from './routes/studentRoutes.js';
import teachersRoutes from './routes/teacherRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true 
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/students',studentsRoutes);
app.use('/api/teachers',teachersRoutes);
app.use('/api/admin',adminRoutes)

export default app;