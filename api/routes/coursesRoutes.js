import express from 'express';
import courseController from '../Controllers/courseController.js';
import { authorizeRole,authorizeRoles, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for modules
// get
router.get('/', verifyToken,authorizeRoles(['admin','student']), courseController.getAll);
router.get('/:id',verifyToken,authorizeRoles(['admin','student']),courseController.getById);
router.get('/student/:id',verifyToken,authorizeRole('student'),courseController.getCourseByStudentId);
router.get('/view/student-by-course',verifyToken,authorizeRole('admin'),courseController.getCourseStudentCount);
router.get('/view/course-by-admin',verifyToken,authorizeRole('admin'),courseController.getCountCoursesByAdmin)
router.get('/view/modules-by-course',verifyToken,authorizeRole('admin'),courseController.getCourseModuleCount);

// post
router.post('/',verifyToken,authorizeRole('admin'),courseController.create);

// put
router.put('/:id',verifyToken,authorizeRole('admin'),courseController.update);

// delete
router.delete('/:id',verifyToken,authorizeRole('admin'),courseController.delete);

export default router;