import express from 'express';
import courseController from '../Controllers/courseController.js';

const router = express.Router();
//posts
router.post('/course/subscribe/:id');
router.post('/course/desubscribe/:id');

//gets
router.get('/certificates/view/:id');
router.get('/courses/view/student/:id',courseController.getCourseByStudentId);
router.get('/courses/view',courseController.getAll);
router.get('/courses/view/:id');
router.get('/courses/view/:id/modules');
router.get('/viewTeacher/:id');
router.get('/viewCompleteCourse');
router.get('/searchCourse/:id');

// put
router.put('/editPassword/:id');

//delete
router.delete('/account/:id');

export default router;