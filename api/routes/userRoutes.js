import express from 'express';
import { searchCourse, viewModule, editProfile, viewProfile } from '../Controllers/userController.js';

const router = express.Router();

router.get('/searchCourse/id', searchCourse);
router.get('/viewModule', viewModule);
router.get('/viewProfile', viewProfile);

router.put('/editProfile', editProfile);

export default router;
