import React from "react";
import { useUploadState } from "../hook/upload/useUploadActions";

function ImageViewer() {
  const uploadState = useUploadState();

  return (
    <React.Fragment>
      <h1>Retrieved Image from AWS S3 Bucket</h1>
      <div className="preview-container">
        <React.Fragment>
          <div className="preview">
            <img
              id="show-picture"
              src={uploadState.uploadedUrl as string}
              alt="File stored in AWS S3"
            />
          </div>
        </React.Fragment>
      </div>
    </React.Fragment>
  );
}

export default ImageViewer;
