import Lesson from '../models/Lesson.js';
import { uploadFileToGoogleDrive } from '../utils/UploadFileToGoogledrive.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_SIZE_LIMIT = process.env.FILE_SIZE_LIMIT ? parseInt(process.env.FILE_SIZE_LIMIT) : 1048576; // Default to 1MB if not set

export const createLesson = async (req, res) => {
  try {
    const { title, description, class: classNumber } = req.body;
    let resources = [];

    console.log('Request body:', req.body); 
    console.log('Request files:', req.files);

    // Check for uploaded files
    if (req.files && req.files.resources) {
      const resource = req.files.resources; // Use plural 'resources' as per your log

      // Check file size limit
      if (resource.size > FILE_SIZE_LIMIT) {
        return res.status(400).json({ success: false, message: 'File size exceeds 1MB limit' });
      }

      const resourcePath = path.join(__dirname, '..', 'public', 'uploads', resource.name);
      console.log('Resource path:', resourcePath);
      await resource.mv(resourcePath);
      console.log('File moved to:', resourcePath);

      const destFileName = `lessons/${resource.name}`;
      
      const googleDriveLink = await uploadFileToGoogleDrive(resourcePath, resource.name);
      console.log('File uploaded to Google Drive:', googleDriveLink);
      resources.push(googleDriveLink);

      // Remove the file from local storage
      fs.unlinkSync(resourcePath);
      console.log('Resource path deleted:', resourcePath);
    } else {
      console.error('No file uploaded');
    }

    console.log('Resources:', resources);

    const lesson = new Lesson({ title, description, class: classNumber, resources });
    await lesson.save();

    res.status(201).json({ success: true, lesson });
  } catch (error) {
    console.error('Error creating lesson:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const searchLessons = async (req, res) => {
  const searchQuery = req.query.q;
  try {
    const results = await Lesson.find({
      title: { $regex: `^${searchQuery}`, $options: 'i' } 
    });
    res.json({ results });
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
