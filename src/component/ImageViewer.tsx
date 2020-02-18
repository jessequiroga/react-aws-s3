import React, { PureComponent } from "react";

class ImageViewer extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <h1>Retrieved Image from AWS S3 Bucket</h1>
        <div className="preview-container">
          <React.Fragment>
            <div className="preview">
              <img
                id="show-picture"
                src={""}
                alt="File stored in AWS S3"
                // onLoad={this.handleImageLoaded}
                // onError={this.handleImageError}
              />
            </div>
          </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default ImageViewer;
