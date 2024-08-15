import express from 'express';
const router = express.Router();
import { createLesson, searchLessons } from '../controllers/lessonController.js';
import { authenticateUser } from '../middlewares/authentication.js';

router.post('/', authenticateUser, createLesson);

router.get('/search', searchLessons);

export default router;
