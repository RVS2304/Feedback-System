import React, { useState } from 'react';
import axios from 'axios';

function FileUploadComponent() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('File uploaded successfully.');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to upload file.');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input type="file" onChange={handleFileChange} required />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
}

export default FileUploadComponent;
