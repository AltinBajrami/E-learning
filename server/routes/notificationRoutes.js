import express from 'express';
import { authenticateUser } from '../middlewares/authentication.js';
import {
  deleteAllNotificatons,
  getAllNotifications,
  deleteNotificatonsById,
} from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', authenticateUser, getAllNotifications);
router.delete('/:notificationId', authenticateUser, deleteNotificatonsById);
router.delete('/', authenticateUser, deleteAllNotificatons);

export default router;
