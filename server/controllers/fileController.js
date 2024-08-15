import { listFilesFromGoogleDrive, getFileLinkById } from '../utils/UploadFileToGoogledrive.js';

export const getFiles = async (req, res) => {
  try {
    const files = await listFilesFromGoogleDrive();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFileLink = async (req, res) => {
  const { id } = req.params;
  try {
    const webViewLink = await getFileLinkById(id);
    if (!webViewLink) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.json({ webViewLink });
  } catch (error) {
    console.error('Error fetching file link:', error);
    res.status(500).json({ error: error.message });
  }
};

