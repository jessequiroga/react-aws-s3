import React from "react";
import { Container, ProgressBar } from "react-bootstrap";
import {
  useUploadState,
  useResetUploadStatusAction
} from "../hook/upload/useUploadActions";
import {
  useDownloadState,
  useDownloadFileAction
} from "../hook/useDownloadAcrions";

function ViewerBody(): React.ReactElement {
  const downloadState = useDownloadState();

  const Content = (): React.ReactElement => {
    if (downloadState.status === "done") {
      return (
        <>
          <Container>
            <img
              id="show-picture"
              src={downloadState.data}
              alt="File stored in AWS S3"
              width="600"
            />
          </Container>
        </>
      );
    }

    if (downloadState.status === "in progress") {
      return (
        <>
          <div className="prog-container" style={{ width: 300 }}>
            <ProgressBar
              now={downloadState.progress}
              label={`${downloadState.progress}%`}
            />
          </div>
        </>
      );
    }

    return (
      <>
        <div />
      </>
    );
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
