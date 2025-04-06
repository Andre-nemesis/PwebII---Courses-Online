import express from 'express';
import userController from '../Controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/verify-email',userController.searchUserByEmail);
router.post('/restet-password',userController.resetPassword);

export default router;
