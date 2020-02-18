import React from "react";
import { connect } from "react-redux";
import { RootState } from "../store/configureStore";

import FileUploader from "./FileUploader";
import ImageViewer from "./ImageViewer";
import { uploadFile } from "../store/action/upload";
import { Dispatch } from "redux";
import { returntypeof } from "react-redux-typescript";

const mapStateToProps = (state: RootState) => ({
  uploads: state.handleActions
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  uploadFile(file: File) {
    dispatch(uploadFile(file));
  }
});

const statePropTypes = returntypeof(mapStateToProps);
const actionPropTypes = returntypeof(mapDispatchToProps);

type Props = typeof statePropTypes & typeof actionPropTypes & {};
type State = {};

class Main extends React.Component<Props, State> {
  render() {
    return (
      <div className="Main">
        <FileUploader
          uploads={this.props.uploads}
          uploadFile={this.props.uploadFile}
        ></FileUploader>
        <ImageViewer></ImageViewer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
