import React, { Component } from "react";
import { FileUploadState } from "../store/reducer/upload";

type Props = {
  uploads: FileUploadState;
  uploadFile: (file: File) => void;
};

type State = {
  file: File | null;
};

class FileUploader extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      file: null
    };
  }

  getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log(file.name);
      this.setState({
        file: file
      });
    }
  };

  onSubmitClicked = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.file) {
      this.props.uploadFile(this.state.file);
    } else {
      console.log("file is null");
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Upload an image to AWS S3 Bucket</h1>
        <input
          id="upload-image"
          type="file"
          accept="image/*"
          onChange={this.getImage}
        />
        <p>{`Status: ${this.props.uploads.status}`}</p>
        <form onSubmit={this.onSubmitClicked}>
          <button id="file-upload-button">Upload</button>
        </form>
      </React.Fragment>
    );
  }
}

export default FileUploader;
