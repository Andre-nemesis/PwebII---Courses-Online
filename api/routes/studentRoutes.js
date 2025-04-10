import express from 'express';
import studentController from '../Controllers/studentController.js';
import { authorizeRole,authorizeRoles, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();
//posts
router.post('/',verifyToken,authorizeRole('admin'),studentController.create);
router.post('/course/subscribe/:id/user/:user', verifyToken, authorizeRole('student'),studentController.subcribeCourse);
router.post('/course/desubscribe/:id/user/:user', verifyToken, authorizeRole('student'),studentController.unsubcribeCourse);
router.post('/course/verify/:id/user/:user', verifyToken, authorizeRole('student'),studentController.isSubcribed);

//gets
router.get('/viewCompleteCourse', verifyToken, authorizeRole('student'), studentController.viewCompletedCourses);
router.get('/searchCourse/:id', verifyToken, authorizeRole('student'), studentController.searchCourse);
router.get('/:id',verifyToken,authorizeRoles(['admin','student']),studentController.getById);
router.get('/search/:term',verifyToken,authorizeRole('admin'),studentController.searchByTerm);
router.get('/subcribed-courses/:id',verifyToken,authorizeRole('student'),studentController.subcribeCourseAll);

// put
router.put('/:id',verifyToken,authorizeRoles(['admin','student']),studentController.update);

//delete
router.delete('/account/:id', verifyToken, authorizeRoles(['admin','student']), studentController.delete);

export default router;