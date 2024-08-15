import express from 'express';
import { getKids } from '../controllers/kidController.js';

const router = express.Router();

router.get('/', getKids);

export default router;
