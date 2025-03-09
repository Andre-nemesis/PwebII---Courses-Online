import express from 'express';
//import { login, logout, createAccount } from '../Controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/createAccount', createAccount);

export default router;