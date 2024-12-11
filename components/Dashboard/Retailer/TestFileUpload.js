import React from "react";
import FileUploadComponent from "./FileUploadComponent";

const TestFileUpload = () => {
  const dynamicFolderName = "testFolder"; // Example dynamic folder name

  return (
    <div>
      <h1>Test File Upload</h1>
      <FileUploadComponent folderName={dynamicFolderName} />
    </div>
  );
};

export default TestFileUpload;
