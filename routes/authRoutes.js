import express from 'express';
import { login, logout, signUp } from '../Controllers/authController.js';
import { authorizeRole, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/createAccount', signUp);
router.get('/courses',verifyToken,authorizeRole('admin'));
router.get('/admin',verifyToken,authorizeRole('admin'));

export default router;