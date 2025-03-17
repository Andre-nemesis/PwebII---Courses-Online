import express from 'express';
import courseController from '../Controllers/courseController.js';
import studentController from '../Controllers/studentController.js';

const router = express.Router();
//posts
router.post('/course/subscribe/:id');
router.post('/course/desubscribe/:id');

//gets
router.get('/courses/view/student/:id', courseController.getCourseByStudentId);
router.get('/courses/view', courseController.getAll);
router.get('/courses/view/:id', courseController.getById);
router.get('/courses/view/:id/modules', studentController.viewModules);
router.get('/viewTeacher/:id', studentController.viewTeacher);
router.get('/viewCompleteCourse', studentController.viewCompletedCourses);
router.get('/searchCourse/:id', studentController.searchCourse);


// put
router.put('/editPassword/:id', studentController.resetPassword);

//delete
router.delete('/account/:id', studentController.delete);

export default router;