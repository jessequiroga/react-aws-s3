import { handleActions } from "redux-actions";
import { actionTypes } from "../actions/download";

export interface FileDownloadState {
  status: string;
  data: string;
  error: string;
  key: string;
  progress: number;
}
const initialState: FileDownloadState = {
  status: "init",
  data: "",
  error: "",
  key: "",
  progress: 0
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
        progress: 0,
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
    [actionTypes.DOWNLOAD_FILE_PROGRESS]: (
      state: FileDownloadState,
      action
    ) => {
      console.log("download progress");
      return {
        ...state,
        progress: action.payload.progress
      };
    },
    [actionTypes.DOWNLOAD_FILE_SUCCESS]: (state: FileDownloadState, action) => {
      console.log("download success");
      return {
        ...state,
        status: "done",
        data: action.payload.data,
        progress: 100
      };
    },
    [actionTypes.DOWNLOAD_FILE_FAILED]: (state: FileDownloadState, action) => {
      console.log("download failed", action.payload.error);
      alert(action.payload.error);
      return {
        ...state,
        status: "error",
        key: "",
        error: action.payload.error,
        progress: 0
      };
    }
  },
  initialState
);

export default downloadReducer;
