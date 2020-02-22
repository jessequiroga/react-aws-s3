import { handleActions } from "redux-actions";
import { actionTypes } from "../actions/download";

export interface FileDownloadState {
  status: string;
  data: string;
  error: string;
  key: string;
}
const initialState: FileDownloadState = {
  status: "init",
  data: "",
  error: "",
  key: ""
};

const downloadReducer = handleActions(
  {
    [actionTypes.DOWNLOAD_FILE]: (state: FileDownloadState, action) => {
      console.log(`download file ${action.payload.key}`);
      return {
        ...state,
        status: "pending",
        error: "",
        data: "",
        key: action.payload.key
      };
    },
    [actionTypes.DOWNLOAD_FILE_START]: (state: FileDownloadState) => {
      console.log("download start");
      return {
        ...state,
        status: "in progress"
      };
    },
    [actionTypes.DOWNLOAD_FILE_SUCCESS]: (state: FileDownloadState, action) => {
      console.log("download success");
      return {
        ...state,
        status: "done",
        data: action.payload.data,
        key: ""
      };
    },
    [actionTypes.DOWNLOAD_FILE_FAILED]: (state: FileDownloadState, action) => {
      console.log("download failed");
      return {
        ...state,
        status: "error",
        key: "",
        error: action.payload.error
      };
    }
  },
  initialState
);

export default downloadReducer;
