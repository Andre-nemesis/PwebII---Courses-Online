import express from 'express';
// import { searchCourse, viewModule, editProfile, viewProfile } from '../Controllers/userController.js';

const router = express.Router();

router.get('/searchCourse/id');
router.get('/viewModule');
router.get('/viewProfile');

router.put('/editProfile');

export default router;
