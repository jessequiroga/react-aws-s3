import { createAction } from "redux-actions";

export const actionTypes = {
  DOWNLOAD_FILE: "DOWNLOAD_FILE",
  DOWNLOAD_FILE_START: "DOWNLOAD_FILE_START",
  DOWNLOAD_FILE_PROGRESS: "DOWNLOAD_FILE_PROGRESS",
  DOWNLOAD_FILE_SUCCESS: "DOWNLOAD_FILE_SUCCESS",
  DOWNLOAD_FILE_FAILED: "DOWNLOAD_FILE_FAILED"
};

export const downloadFileAction = createAction(
  actionTypes.DOWNLOAD_FILE,
  (key: string) => ({ key })
);
export const downloadFileStartAction = createAction(
  actionTypes.DOWNLOAD_FILE_START
);
export const downloadFileProgressAction = createAction(
  actionTypes.DOWNLOAD_FILE_PROGRESS,
  (progress: number) => ({ progress })
);
export const downloadFileSuccessAction = createAction(
  actionTypes.DOWNLOAD_FILE_SUCCESS,
  (data: string) => ({ data })
);
export const downloadFileFailedAction = createAction(
  actionTypes.DOWNLOAD_FILE_FAILED,
  (error: string) => ({ error })
);
