import express from 'express';
// import { 
//     deleteAccount, viewStudent, viewTeacher, deleteTeacher, createCourse, editCourse, deleteCourse
// } from '../Controllers/adminController.js';

const router = express.Router();

router.delete('/deleteAccount/id');
router.delete('/deleteTeacher/id');
router.delete('/deleteCourse/id');

router.get('/viewStudent');
router.get('/viewTeacher');

router.post('/createCourse');

router.put('/editCourse/id');

export default router;
