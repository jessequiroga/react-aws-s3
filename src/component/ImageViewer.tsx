import React from "react";
import { useUploadState } from "../hook/upload/useUploadActions";

function ImageViewer() {
  const uploadState = useUploadState();

  return (
    <>
      <h1>Retrieved Image from AWS S3 Bucket</h1>
      <div className="preview-container">
        <>
          <div className="preview">
            <img
              id="show-picture"
              src={uploadState.uploadedUrl as string}
              alt="File stored in AWS S3"
            />
          </div>
        </>
      </div>
    </>
  );
}

export default ImageViewer;
