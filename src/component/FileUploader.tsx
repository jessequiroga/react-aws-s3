import React, { PureComponent } from "react";

class FileUploader extends PureComponent {
  //     static propTypes = {
  //       status: PropTypes.string.isRequired,
  //       error: PropTypes.oneOfType([
  //           PropTypes.bool,
  //           PropTypes.object,
  //       ]).isRequired,
  //       progress: PropTypes.number.isRequired,
  //       files: PropTypes.arrayOf(PropTypes.string).isRequired,
  //       uploadFiles: PropTypes.func.isRequired,
  //   };
  getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log(file.name);
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
        <form>
          <button id="file-upload-button">Upload</button>
        </form>
      </React.Fragment>
    );
  }
}

export default FileUploader;
