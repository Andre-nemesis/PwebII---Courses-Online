import express from 'express';
import moduleController from '../Controllers/moduleController.js';
import { authorizeRole, verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

//get
router.get('/module/view',verifyToken,authorizeRole('teacher'),moduleController.getAll);
router.get('/module/view/teacher/:id',verifyToken,authorizeRole('teacher'),moduleController.getAllModuleForTeacherId);

//post
router.post('/module/create',verifyToken,authorizeRole('teacher'),moduleController.create);

//put
router.put('/module/edit/:id',verifyToken,authorizeRole('teacher'),moduleController.update);

//delete
router.delete('/module/delete/:id',verifyToken,authorizeRole('teacher'),moduleController.delete);

export default router;