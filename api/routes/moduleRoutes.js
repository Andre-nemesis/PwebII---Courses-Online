import express from 'express';
import moduleController from '../Controllers/moduleController.js';
import { authorizeRole,authorizeRoles, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for modules
// get
router.get('/', verifyToken,authorizeRoles(['admin','teacher']), moduleController.getAll);
router.get('/:id',verifyToken,authorizeRoles(['admin','teacher']),moduleController.getById);
router.get('/teacher/:id',verifyToken,authorizeRoles(['admin','teacher']),moduleController.getAllModuleForTeacherId);

// post
router.post('/',verifyToken,authorizeRole('teacher'),moduleController.create);

// put
router.put('/:id',verifyToken,authorizeRole('teacher'),moduleController.update);

// delete
router.delete('/:id',verifyToken,authorizeRole('teacher'),moduleController.delete);

export default router;