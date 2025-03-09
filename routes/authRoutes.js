import express from 'express';
import { login, logout, createAccount } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/createAccount', createAccount);

export default router;