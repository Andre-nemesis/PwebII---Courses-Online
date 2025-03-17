import express from 'express';
import courseController from '../Controllers/courseController.js';
import studentController from '../Controllers/studentController.js';
import { authorizeRole, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();
//posts
router.post('/course/subscribe/:id/user/:user', verifyToken, authorizeRole('student'),studentController.subcribeCourse);
router.post('/course/desubscribe/:id/user/:user', verifyToken, authorizeRole('student'),studentController.unsubcribeCourse);

//gets
router.get('/courses/view/student/:id', verifyToken, authorizeRole('student'), courseController.getCourseByStudentId);
router.get('/courses/view', verifyToken, authorizeRole('student'), courseController.getAll);
router.get('/courses/view/:id', verifyToken, authorizeRole('student'), courseController.getById);
router.get('/courses/view/:id/modules', verifyToken, authorizeRole('student'), studentController.viewModules);
router.get('/viewTeacher/:id', verifyToken, authorizeRole('student'), studentController.viewTeacher);
router.get('/viewCompleteCourse', verifyToken, authorizeRole('student'), studentController.viewCompletedCourses);
router.get('/searchCourse/:id', verifyToken, authorizeRole('student'), studentController.searchCourse);


// put
router.put('/editPassword/:id', verifyToken, authorizeRole('student'), studentController.resetPassword);

//delete
router.delete('/account/:id', verifyToken, authorizeRole('student'), studentController.delete);

export default router;