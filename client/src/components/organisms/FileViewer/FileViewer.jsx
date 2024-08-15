import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FileViewer.scss';

const FileViewer = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAllFiles, setShowAllFiles] = useState(false);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/files/files');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleToggleShowAll = () => {
    setShowAllFiles((prevShowAll) => !prevShowAll);
  };

  const filesToDisplay = showAllFiles ? files : files.slice(0, 3);

  return (
    <div className="file-viewer">
      <h2 className="file-viewer__title">Available Files</h2>
      <ul className="file-viewer__list">
        {filesToDisplay.map((file) => (
          <li key={file.id} className="file-viewer__list-item">
            <button
              className="file-viewer__button"
              onClick={() => handleFileClick(file)}
            >
              {file.name}
            </button>
          </li>
        ))}
      </ul>

      {files.length > 3 && (
        <button className="file-viewer__toggle-button" onClick={handleToggleShowAll}>
          {showAllFiles ? 'Show Less' : 'View All'}
        </button>
      )}

      {selectedFile && (
        <div className="file-viewer__content">
          <h3 className="file-viewer__content-title">Viewing: {selectedFile.name}</h3>
          {selectedFile.name.endsWith('.pdf') ? (
            <iframe
              src={selectedFile.webViewLink.replace('/view', '/preview')}
              style={{ width: '100%', height: '600px' }}
              title={selectedFile.name}
            ></iframe>
          ) : (
            <img
              src={selectedFile.webViewLink}
              alt={selectedFile.name}
              className="file-viewer__image"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FileViewer;
