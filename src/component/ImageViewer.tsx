import React from "react";
import {
  useUploadState,
  useResetUploadStatusAction
} from "../hook/upload/useUploadActions";
import {
  useDownloadState,
  useDownloadFileAction
} from "../hook/useDownloadAcrions";
import "bootstrap/dist/css/bootstrap.css";

function ViewerBody(): React.ReactElement {
  const downloadState = useDownloadState();

  const Content = () => {
    if (downloadState.status === "done") {
      return (
        <>
          <div className="preview-container">
            <img
              id="show-picture"
              src={downloadState.data}
              alt="File stored in AWS S3"
              width="600"
            />
          </div>
        </>
      );
    }
    return <div />;
  };

  return (
    <>
      <h1>Retrieved Image from AWS S3 Bucket</h1>
      <p>{`Status: ${downloadState.status}, File: ${downloadState.key}, Progress: ${downloadState.progress}`}</p>
      <Content />
    </>
  );
}

function ImageViewer(): React.ReactElement {
  const uploadState = useUploadState();
  const uploadReset = useResetUploadStatusAction();
  const downloadState = useDownloadState();
  const downloadAction = useDownloadFileAction();

  if (
    uploadState.uploadedKey !== "" &&
    uploadState.uploadedKey !== downloadState.key &&
    uploadState.status === "done"
  ) {
    downloadAction(uploadState.uploadedKey);
    uploadReset();
  }

  return <ViewerBody />;
}

export default ImageViewer;
