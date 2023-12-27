import React, { useState } from "react";
import api from "../../utils/api.utils";
import "bootstrap/dist/css/bootstrap.min.css";

const UploadFile = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleUpload = async () => {
    const clientId = "941b3a19da909d1";
    const auth = "Client-ID " + clientId;

    try {
      const promises = selectedFiles.map((file) => {
        const formData = new FormData();
        formData.append("image", file);

        return fetch("https://api.imgur.com/3/image", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: auth,
          },
        })
          .then((response) => response.json())
          .catch((error) => console.error("Error:", error));
      });

      const responses = await Promise.all(promises);
      console.log("Uploaded:", responses);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const preventDefaults = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className="container mt-5 p-3 border border-primary rounded"
      onDrop={handleDrop}
      onDragOver={preventDefaults}
      onDragEnter={preventDefaults}
    >
      <h3>Upload File</h3>
      <div className="mb-3">
        <label htmlFor="fileInput" className="form-label">
          Drag and drop files here or click to browse.
        </label>
        <input
          type="file"
          id="fileInput"
          className="form-control"
          multiple
          onChange={handleFileUpload}
        />
      </div>
      <div>
        <h5>Selected Files:</h5>
        <ul className="list-group">
          {selectedFiles.map((file, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {file.name}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFile(index)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default UploadFile;
