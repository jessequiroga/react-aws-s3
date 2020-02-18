import React from "react";
import FileUploader from "./FileUploader";
import ImageViewer from "./ImageViewer";

class Main extends React.Component {
  render() {
    return (
      <div className="Main">
        <FileUploader />
        <ImageViewer />
      </div>
    );
  }
}

export default Main;
