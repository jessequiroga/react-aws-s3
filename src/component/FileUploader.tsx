import React from "react";
import { Container, ProgressBar } from "react-bootstrap";
import {
  useUploadFileAction,
  useSelectedFileAction,
  useUploadState
} from "../hook/upload/useUploadActions";

function FileUploader(): React.ReactElement {
  const uploadState = useUploadState();
  const onSelect = useSelectedFileAction();
  const onLoad = useUploadFileAction();

  const getImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      console.log(file.name);
      onSelect(file);
    }
  };

  const onSubmitClicked = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (uploadState.file) {
      onLoad();
    }
  };

  return (
    <>
      <h1>Upload an image to AWS S3 Bucket</h1>
      <input
        id="upload-image"
        type="file"
        accept="image/*"
        onChange={getImage}
      />
      <p>
        {`Status: ${uploadState.status}, File: ${
          uploadState.file ? uploadState.file.name : ""
        }`}
      </p>
      <form onSubmit={onSubmitClicked}>
        <button type="submit" id="file-upload-button">
          Upload
        </button>
      </form>
      <div className="prog-container" style={{ width: 300 }}>
        <ProgressBar
          now={uploadState.progress}
          label={`${uploadState.progress}%`}
        />
      </div>
    </>
  );
}

export default FileUploader;
