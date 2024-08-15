import React, { useState } from 'react';
import axios from 'axios';
import FileViewer from '../../organisms/FileViewer/FileViewer';
import './UploadFile.scss';  // Import the SCSS file

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [iframeSrc, setIframeSrc] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:4000/api/upload/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIframeSrc(response.data.link);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="upload-file">
      <div className='upload-file-button'>
<input 
        type="file" 
        onChange={handleFileChange} 
        className="upload-file-input" 
      />
      <button 
        onClick={handleUpload} 
        className="upload-file-button"
      >
        Upload
      </button>

      </div>
      
      {iframeSrc && (
        <div className="upload-file__iframe-container">
          <h3 className="upload-file__iframe-container-title">Uploaded File:</h3>
          <iframe
            src={iframeSrc}
            className="upload-file__iframe"
            title="Uploaded File"
          />
        </div>
      )}
      
      <div className="upload-file__file-viewer">
        <FileViewer />
      </div>
    </div>
  );
};

export default UploadFile;
