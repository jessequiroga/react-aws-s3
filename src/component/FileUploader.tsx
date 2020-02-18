import React from "react";
import {
  useUploadFileAction,
  useSelectedFileAction,
  useUploadState,
  //useUploadFileStartAction,
  useUploadFileSuccessAction,
  useUploadFileFailedAction
} from "../hook/upload/useUploadActions";
import uploadFile from "../api/uploadFileAWS";

function FileUploader(): React.ReactElement {
  const uploadState = useUploadState();
  const onSelect = useSelectedFileAction();
  const onLoad = useUploadFileAction();
  const onSuccess = useUploadFileSuccessAction();
  const onFailed = useUploadFileFailedAction();
  //const onStart = useUploadFileStartAction();

  const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log(file.name);
      onSelect(file);
    }
  };

  const onSubmitClicked = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLoad();
    uploadFile(uploadState.file)
      .then(function(uploadedUrl) {
        console.log("uploaded");
        onSuccess(uploadedUrl);
      })
      .catch(function(err) {
        console.log("upload failed- " + err);
        onFailed(true);
      });
  };

  return (
    <React.Fragment>
      <h1>Upload an image to AWS S3 Bucket</h1>
      <input
        id="upload-image"
        type="file"
        accept="image/*"
        onChange={getImage}
      />
      <p>{`Status: ${uploadState.status}, File: ${
        uploadState.file ? uploadState.file.name : ""
      }`}</p>
      <form onSubmit={onSubmitClicked}>
        <button id="file-upload-button">Upload</button>
      </form>
    </React.Fragment>
  );
}

export default FileUploader;
