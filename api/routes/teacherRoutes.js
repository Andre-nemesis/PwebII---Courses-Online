import express from 'express';
import moduleController from '../Controllers/moduleController.js';

const router = express.Router();

//get
router.get('/module/view',moduleController.getAll);
router.get('/module/view/teacher/:id',moduleController.getAllModuleForTeacherId);

//post
router.post('/module/create',moduleController.create);

//put
router.put('/module/edit/:id',moduleController.update);

//delete
router.delete('/module/delete/:id',moduleController.delete);

export default router;