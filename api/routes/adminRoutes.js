import express from 'express';
 import adminController from '../Controllers/adminController.js';
 import { authorizeRole, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.delete('/deleteAccount/id');
router.delete('/deleteTeacher/id');
router.delete('/deleteCourse/id');

router.get('/viewStudent',verifyToken,authorizeRole('admin'),adminController.viewStudent);
router.get('/viewTeacher');

router.post('/createCourse');

router.put('/editCourse/id');

export default router;
