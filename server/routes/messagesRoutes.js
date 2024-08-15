import express from 'express';
import {
  createMessage,
  getAllMessagesByConversationId,
  markMessagesAsRead,
} from '../controllers/messageController.js';
import { authenticateUser } from '../middlewares/authentication.js';

const router = express.Router();

router.post('/', createMessage);
router.get('/:conversationId', getAllMessagesByConversationId);
router.put(
  '/:conversationId/mark-messages',
  authenticateUser,
  markMessagesAsRead
);

export default router;
