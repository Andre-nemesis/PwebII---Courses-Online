import express from 'express';
import teacherController from '../Controllers/teacherController.js';
import { authorizeRole, authorizeRoles, verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

//get
router.get('/',verifyToken,authorizeRoles(['admin','teacher']),teacherController.getAll);
router.get('/:id',verifyToken,authorizeRoles(['admin','teacher']),teacherController.getById);
router.get('/search/:term', verifyToken, authorizeRole('admin'), teacherController.searchByTerm);

//post
router.post('/',verifyToken,authorizeRole('admin'),teacherController.create);

//put
router.put('/:id',verifyToken,authorizeRole('admin'),teacherController.update);

//delete
router.delete('/:id',verifyToken,authorizeRole('admin'),teacherController.delete);

export default router;