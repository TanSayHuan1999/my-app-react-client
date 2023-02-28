import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function ImageDropzone({ onChange }) {
  const [uploadedImage, setUploadedImage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = async (acceptedFiles) => {
    let imgDataUrl = await getImageDataURL(acceptedFiles[0]);
    setUploadedImage(imgDataUrl);
    onChange(imgDataUrl);
  };

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

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  const containerClasses = `w-full h-[500px] border-4 border-dashed border-gray-500 ${
    isDragging ? "bg-gray-100" : "bg-white"
  } flex justify-center items-center`;

  return (
    <div
      {...getRootProps({
        className: containerClasses,
        onDragEnter: () => setIsDragging(true),
        onDragLeave: () => setIsDragging(false),
      })}
    >
      {uploadedImage ? (
        <>
          <img src={uploadedImage} alt="Uploaded" className="h-full w-full object-cover" />
          <input type="hidden" name="uploaded_img" value={uploadedImage} />
        </>
      ) : (
        <>
          <input {...getInputProps()} />
          <p className="text-gray-500 text-center">Drag 'n' drop some files here, or click to select files</p>
        </>
      )}
    </div>
  );
}

export default ImageDropzone;
