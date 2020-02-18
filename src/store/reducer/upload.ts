import {
  SELECTED_FILE,
  UPLOAD_FILE,
  UPLOAD_FILE_START,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILED
} from "../action/upload";
import { handleActions } from "redux-actions";

export interface FileUploadState {
  file: File | null;
  status: string;
  error: boolean;
  uploadedUrl: string | null;
}
const initialState: FileUploadState = {
  file: null,
  status: "init",
  error: false,
  uploadedUrl: ""
};

export default handleActions(
  {
    [SELECTED_FILE]: (state: FileUploadState, action) => {
      if (action && action.payload && action.payload.file) {
        console.log("selected file" + action.payload.file.name);
        return {
          ...state,
          file: action.payload.file,
          status: "file selected",
          error: false
        };
      } else {
        console.log(
          "selected file- none" + action + action.payload + action.payload.file
        );
        return state;
      }
    },
    [UPLOAD_FILE]: (state: FileUploadState, action) => {
      if (state.file) {
        console.log("upload file" + state.file.name);
        return { ...state, status: "pending", error: false, uploadedUrl: "" };
      } else {
        return state;
      }
    },
    [UPLOAD_FILE_START]: (state: FileUploadState, action) => {
      console.log("upload start");
      return { ...state, status: "in progress", error: false, uploadedUrl: "" };
    },
    [UPLOAD_FILE_SUCCESS]: (state: FileUploadState, action) => {
      console.log("upload success");
      return {
        ...state,
        status: "done",
        error: false,
        uploadedUrl: action.payload.uploadedUrl
      };
    },
    [UPLOAD_FILE_FAILED]: (state: FileUploadState, action) => {
      console.log("upload failed");
      return { ...state, status: "error", error: true };
    }
  },
  initialState
);
