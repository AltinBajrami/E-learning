import express from 'express';
import {
  createConversation,
  deleteConversation,
  editConversation,
  getAllConversationsByUser,
  getSingleConversation,
} from '../controllers/conversationController.js';
import { authenticateUser } from '../middlewares/authentication.js';

const router = express.Router();

router.post('/', authenticateUser, createConversation);
router.get('/', authenticateUser, getAllConversationsByUser);
router.get('/:id', authenticateUser, getSingleConversation);
router.patch('/:id', authenticateUser, editConversation);
router.delete('/:id', authenticateUser, deleteConversation);

export default router;
