import React, { useState } from 'react';
import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const storageRef = ref(storage, `uploads/${file.name}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
          console.log('File available at', downloadURL);
        });
      });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {url && <a href={url} target="_blank" rel="noopener noreferrer">View File</a>}
    </div>
  );
};

export default FileUpload;
