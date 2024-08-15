import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const SERVICE_ACCOUNT_PATH = process.env.GOOGLE_SERVICE_ACCOUNT_PATH;
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_PATH,
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

export const uploadFileToGoogleDrive = async (filePath, fileName) => {
  const fileMetadata = {
    name: fileName,
    parents: [FOLDER_ID],
  };

  const media = {
    mimeType: 'application/pdf',
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id, webViewLink',
  });

  const fileId = response.data.id;

  // Make the file publicly accessible
  await drive.permissions.create({
    fileId: fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  });

  // Return the webViewLink for the file
  return response.data.webViewLink;
};

export const listFilesFromGoogleDrive = async () => {
  try {
    const response = await drive.files.list({
      pageSize: 10,
      fields: 'files(id, name, webViewLink)',
    });
    return response.data.files;
  } catch (error) {
    throw new Error('Error retrieving files: ' + error.message);
  }
};

export const getFileLinkById = async (fileId) => {
  try {
    const response = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink',
    });
    return response.data.webViewLink;
  } catch (error) {
    throw new Error('Error retrieving file link: ' + error.message);
  }
};
