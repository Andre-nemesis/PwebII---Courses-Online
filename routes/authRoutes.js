import express from 'express';
import { login, logout, signUp } from '../Controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/createAccount', signUp);

export default router;