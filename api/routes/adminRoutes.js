import express from 'express';
import adminController from '../Controllers/adminController.js';
import { authorizeRole, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.delete('/deleteAccount/id');
router.delete('/deleteTeacher/id');
router.delete('/deleteCourse/id');
router.delete('/unregisterStudentFromCourse');

router.get('/viewStudent',verifyToken,authorizeRole('admin'),adminController.viewStudent);
router.get('/viewTeacher', verifyToken,authorizeRole('admin'),adminController.viewTeacher);
router.get('/viewAdmins',verifyToken,authorizeRole('admin'),adminController.getAll)
router.get('/viewCourse');

router.post('/createCourse');
router.post('/createModule');
router.post('/registerStudentToCourse');
router.post('/completeCourse');
router.post('/registerModuleToCourse');

router.put('/editCourse/id');

export default router;
