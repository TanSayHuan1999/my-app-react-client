import React, { useState, useCallback, useMemo } from "react";

function ImageUploadContainer({ onChange }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const previewUrl = useMemo(() => selectedFile && URL.createObjectURL(selectedFile), [selectedFile]);

  const getImageDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject(new Error("Failed to read the image file."));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = useCallback(
    async (event) => {
      const file = event.target.files[0];
      let imgObjUrl = await getImageDataURL(file);
      setSelectedFile(file);
      onChange(imgObjUrl);
    },
    [onChange]
  );

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    setDragging(false);
  }, []);

  return (
    <div className={`image-upload-container ${dragging ? "dragging" : ""}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      {previewUrl ? <img src={previewUrl} alt="Preview" className="preview-image" /> : <p>Drag and drop an image or click to select a file</p>}
      <label htmlFor="image-upload-input">Choose a file</label>
      <input type="file" id="image-upload-input" onChange={handleFileChange} accept="image/*" />
    </div>
  );
}

export default ImageUploadContainer;
