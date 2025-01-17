import express from 'express';
import {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';
import { authenticateUser } from '../middlewares/authentication.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', authenticateUser, logout);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
