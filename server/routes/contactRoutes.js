import express from 'express';
import {
  submitContactForm,
  getAllSubmittedContacts,
} from '../controllers/contactController.js';

const router = express.Router();

router.post('/', submitContactForm);
router.get('/', getAllSubmittedContacts);

export default router;
