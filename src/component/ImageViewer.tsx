import React, { useEffect } from "react";
import { useUploadState } from "../hook/upload/useUploadActions";
import getKeyList from "../api/BucketInfo";
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
  url: string;
  data: string;
};

function DrawImage({ url, data }: Props): React.ReactElement {
  return (
    <div className="preview-container">
      <img
        id="show-picture"
        src={url || data}
        alt="File stored in AWS S3"
        width="600"
      />
    </div>
  );
}

function ImageViewer(): React.ReactElement {
  const uploadState = useUploadState();
  const downloadState = useDownloadState();
  const onDownload = useDownloadFileAction();

  useEffect(() => {
    if (!uploadState.uploadedUrl) {
      getKeyList()
        .then((keyList: string[]) => {
          if (keyList.length > 0) {
            console.log("get Image");
            onDownload(keyList[0]);
          } else {
            console.log("no files");
          }
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  }, []);

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
      <DrawImage url={uploadState.uploadedUrl} data={downloadState.data} />
    </>
  );
}

export default ImageViewer;
