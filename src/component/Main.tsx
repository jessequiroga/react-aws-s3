import React from "react";
import FileUploader from "./FileUploader";
import ImageViewer from "./ImageViewer";
import "bootstrap/dist/css/bootstrap.min.css";

function Main(): React.ReactElement {
  return (
    <div className="Main">
      <FileUploader />
      <ImageViewer />
    </div>
  );
}

export default Main;
