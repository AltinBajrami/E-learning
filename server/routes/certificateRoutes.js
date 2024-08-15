import express from 'express';
import {
  getCompletedQuizzes,
  generateCertificate,
} from '../controllers/certificateController.js';
import { authenticateUser } from '../middlewares/authentication.js';

const router = express.Router();

router.route('/').get(authenticateUser, getCompletedQuizzes);
router.route('/generate').post(authenticateUser, generateCertificate);

export default router;
