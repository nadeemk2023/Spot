import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../../utils/api.utils";

const UploadFile = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileUpload = (event) => {
    setSelectedFiles([...selectedFiles, ...event.target.files]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const filesArray = Array.from(event.dataTransfer.files);
    setSelectedFiles([...selectedFiles, ...filesArray]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);

      api
        .post("/files/images", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          res.data;
          console.log(res.data);
        })
        .catch((err) => {
          err;
        });
    });
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
