import express from 'express';
import { searchCourse, viewModule, editProfile, viewProfile } from '../Controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/searchCourse/id',verifyToken,searchCourse);
router.get('/viewModule',verifyToken, viewModule);
router.get('/viewProfile',verifyToken, viewProfile);

router.put('/editProfile',verifyToken, editProfile);

export default router;
