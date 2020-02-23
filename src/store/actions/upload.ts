import { createAction } from "redux-actions";

export const actionTypes = {
  SELECTED_FILE: "SELECTED_FILE",
  UPLOAD_FILE: "UPLOAD_FILE",
  UPLOAD_FILE_START: "UPLOAD_FILE_START",
  UPLOAD_FILE_PROGRESS: "UPLOAD_FILE_PROGRESS",
  UPLOAD_FILE_SUCCESS: "UPLOAD_FILE_SUCCESS",
  UPLOAD_FILE_FAILED: "UPLOAD_FILE_FAILED",
  UPLOAD_FILE_CANCEL: "UPLOAD_FILE_CANCEL",
  UPLOAD_FILE_CANCELED: "UPLOAD_FILE_CANCELED",
  UPLOAD_STATUS_RESET: "UPLOAD_STATUS_RESET"
};

export const selectedFileAction = createAction(
  actionTypes.SELECTED_FILE,
  (file: File) => ({
    file
  })
);
export const uploadFileAction = createAction(actionTypes.UPLOAD_FILE);
export const uploadFileStartAction = createAction(
  actionTypes.UPLOAD_FILE_START
);
export const uploadFileProgressAction = createAction(
  actionTypes.UPLOAD_FILE_PROGRESS,
  (progress: number) => ({ progress })
);
export const uploadFileSuccessAction = createAction(
  actionTypes.UPLOAD_FILE_SUCCESS,
  (uploadedKey: string) => ({ uploadedKey })
);
export const uploadFileFailedAction = createAction(
  actionTypes.UPLOAD_FILE_FAILED,
  (error: boolean) => ({ error })
);
export const uploadFileCancelAction = createAction(
  actionTypes.UPLOAD_FILE_CANCEL
);

export const uploadFileCanceledAction = createAction(
  actionTypes.UPLOAD_FILE_CANCELED
);

export const uploadStatusResetAction = createAction(
  actionTypes.UPLOAD_STATUS_RESET
);
