import express from 'express';
import authRoutes from './routes/authRoutes.js';
import studentsRoutes from './routes/studentRoutes.js';
import teachersRoutes from './routes/teacherRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import courseRoutes from './routes/coursesRoutes.js'
import moduleRoutes from './routes/moduleRoutes.js';
import userRoutes from './routes/userRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';

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
app.use('/api/admin',adminRoutes);
app.use('/api/courses',courseRoutes);
app.use('/api/modules',moduleRoutes);
app.use('/api/users',userRoutes);
app.use('/api/certificates',certificateRoutes);

export default app;