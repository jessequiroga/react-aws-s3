import React from "react";
import { useUploadState } from "../hook/upload/useUploadActions";
import {
  useDownloadState,
  useDownloadFileAction
} from "../hook/useDownloadAcrions";
import "bootstrap/dist/css/bootstrap.css";

function DrawProgress(): React.ReactElement {
  return (
    <div className="container">
      <div className="spinner-border" />
    </div>
  );
}

type Props = {
  data: string;
};

function DrawImage({ data }: Props): React.ReactElement {
  return (
    <div className="preview-container">
      <img
        id="show-picture"
        src={data}
        alt="File stored in AWS S3"
        width="600"
      />
    </div>
  );
}

function ImageViewer(): React.ReactElement {
  const uploadState = useUploadState();
  const downloadState = useDownloadState();
  const downloadAction = useDownloadFileAction();

  if (
    uploadState.uploadedKey !== "" &&
    uploadState.uploadedKey !== downloadState.key
  ) {
    downloadAction(uploadState.uploadedKey);
  }

  if (downloadState.status === "in progress") {
    return (
      <>
        <h1>Retrieved Image from AWS S3 Bucket</h1>
        <DrawProgress />
      </>
    );
  }

  return (
    <>
      <h1>Retrieved Image from AWS S3 Bucket</h1>
      <DrawImage data={downloadState.data} />
    </>
  );
}

export default ImageViewer;
