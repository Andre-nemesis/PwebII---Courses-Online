import express from 'express';
import adminController from '../Controllers/adminController.js';
import { authorizeRole, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/view/:id',verifyToken,authorizeRole('admin'),adminController.getById);
router.get('/search/:term',verifyToken,authorizeRole('admin'),adminController.searchByTerm);

router.delete('/deleteAccount/:id', verifyToken, authorizeRole('admin'), adminController.deleteAccount);
router.delete('/deleteTeacher/:id', verifyToken, authorizeRole('admin'), adminController.deleteTeacher);

router.get('/viewStudent', verifyToken, authorizeRole('admin'), adminController.viewStudent);
router.get('/viewTeacher', verifyToken, authorizeRole('admin'), adminController.viewTeacher);
router.get('/viewAdmins', verifyToken, authorizeRole('admin'), adminController.getAll);

export default router;
