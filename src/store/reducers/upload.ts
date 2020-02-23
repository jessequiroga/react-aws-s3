import { handleActions } from "redux-actions";
import { actionTypes } from "../actions/upload";

export interface FileUploadState {
  file: File | null;
  status: string;
  error: boolean;
  uploadedKey: string;
}
const initialState: FileUploadState = {
  file: null,
  status: "init",
  error: false,
  uploadedKey: ""
};

const uploadReducer = handleActions(
  {
    [actionTypes.SELECTED_FILE]: (state: FileUploadState, action) => {
      if (action && action.payload && action.payload.file) {
        console.log(`selected file${action.payload.file.name}`);
        return {
          ...state,
          file: action.payload.file,
          status: "file selected",
          error: false
        };
      }
      console.log(
        `selected file- none${action}${action.payload}${action.payload.file}`
      );
      return state;
    },
    [actionTypes.UPLOAD_FILE]: (state: FileUploadState) => {
      if (state.file) {
        console.log(`upload file${state.file.name}`);
        return { ...state, status: "pending", error: false, uploadedUrl: "" };
      }
      return state;
    },
    [actionTypes.UPLOAD_FILE_START]: (state: FileUploadState) => {
      console.log("upload start");
      return { ...state, status: "in progress", error: false, uploadedUrl: "" };
    },
    [actionTypes.UPLOAD_FILE_SUCCESS]: (state: FileUploadState, action) => {
      console.log("upload success");
      return {
        ...state,
        status: "done",
        error: false,
        uploadedKey: action.payload.uploadedKey
      };
    },
    [actionTypes.UPLOAD_FILE_FAILED]: (state: FileUploadState) => {
      console.log("upload failed");
      return { ...state, status: "error", error: true };
    }
  },
  initialState
);

export default uploadReducer;
