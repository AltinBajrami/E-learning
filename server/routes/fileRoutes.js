import express from 'express';
import { getFiles, getFileLink } from '../controllers/fileController.js';

const router = express.Router();

router.get('/files', getFiles);
router.get('/files/:id', getFileLink);

export default router;
