import express from 'express';
import { uploadFileToGoogleDrive, listFilesFromGoogleDrive } from '../utils/UploadFileToGoogledrive.js';
import fs from 'fs';

const router = express.Router();

router.post('/file', async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const filePath = `./uploads/${file.name}`;

    // Save file temporarily
    file.mv(filePath, async (err) => {
      if (err) {
        console.error('Error saving file:', err);
        return res.status(500).send('File upload failed.');
      }

      try {
        // Upload to Google Drive
        const webViewLink = await uploadFileToGoogleDrive(filePath, file.name);

        // Remove the temporary file
        fs.unlinkSync(filePath);

        res.json({ webViewLink });
      } catch (err) {
        console.error('Error uploading to Google Drive:', err);
        res.status(500).send('File upload to Google Drive failed.');
      }
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).send('Unexpected server error.');
  }
});

router.get('/files', async (req, res) => {
  try {
    const files = await listFilesFromGoogleDrive(); // Implement this function to fetch files
    res.json(files);
  } catch (err) {
    console.error('Error fetching files:', err);
    res.status(500).send('Failed to fetch files.');
  }
});

export default router;