import express from 'express';
import adminController from '../Controllers/adminController.js';
import { authorizeRole, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.delete('/deleteAccount/id', verifyToken, authorizeRole('admin'), adminController.deleteAccount);
router.delete('/deleteTeacher/id', verifyToken, authorizeRole('admin'), adminController.deleteTeacher);
router.delete('/deleteCourse/id', verifyToken, authorizeRole('admin'), adminController.deleteCourse);
router.delete('/unregisterStudentFromCourse', verifyToken, authorizeRole('admin'), adminController.unenrollStudent);

router.get('/viewStudent', verifyToken, authorizeRole('admin'), adminController.viewStudent);
router.get('/viewTeacher', verifyToken, authorizeRole('admin'), adminController.viewTeacher);
router.get('/viewAdmins', verifyToken, authorizeRole('admin'), adminController.getAll)
router.get('/viewCourse');

router.post('/createCourse', verifyToken, authorizeRole('admin'), adminController.createCourse);
router.post('/createModule', verifyToken, authorizeRole('admin'), adminController.createModule);
router.post('/registerStudentToCourse', verifyToken, authorizeRole('admin'), );
router.post('/completeCourse', verifyToken, authorizeRole('admin'), adminController.completeCourse);
router.post('/registerModuleToCourse', verifyToken, authorizeRole('admin'), adminController.assignModuleToCourse);

router.put('/editCourse/id');

export default router;
