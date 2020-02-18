import { createAction } from "redux-actions";

export const SELECTED_FILE = "SELECTED_FILE";
export const UPLOAD_FILE = "UPLOAD_FILE";
export const UPLOAD_FILE_START = `${UPLOAD_FILE}_START`;
export const UPLOAD_FILE_SUCCESS = `${UPLOAD_FILE}_SUCCESS`;
export const UPLOAD_FILE_FAILED = `${UPLOAD_FILE}_FAILED`;

export const selectedFileAction = createAction(SELECTED_FILE, (file: File) => ({
  file
}));
export const uploadFileAction = createAction(UPLOAD_FILE);
export const uploadFileStartAction = createAction(UPLOAD_FILE_START);
export const uploadFileSuccessAction = createAction(
  UPLOAD_FILE_SUCCESS,
  (uploadedUrl: string) => ({ uploadedUrl })
);
export const uploadFileFailedAction = createAction(
  UPLOAD_FILE_FAILED,
  (error: boolean) => ({ error })
);
