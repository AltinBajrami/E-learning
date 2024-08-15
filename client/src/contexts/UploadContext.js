import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const UploadContext = createContext();

export const useUpload = () => {
  return useContext(UploadContext);
};

export const UploadProvider = ({ children }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedLink, setUploadedLink] = useState(null);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsUploading(true);
      const response = await axios.post('http://localhost:4000/api/upload', formData);
      setUploadedLink(response.data.webViewLink);
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <UploadContext.Provider value={{ uploadFile, uploadedLink, isUploading }}>
      {children}
    </UploadContext.Provider>
  );
};
