import { takeEvery, call, put, select } from "redux-saga/effects";
import { actionTypes } from "../actions/upload";
import * as upActions from "../actions/upload";
import uploadFile from "../../api/FileUpload";
import { RootState } from "..";

function* uploadAsync(): Generator {
  console.log("uploadAsync");
  yield put(upActions.uploadFileStartAction());
  const state = yield select();

  try {
    const resKey = yield call(
      uploadFile,
      (state as RootState).uploadReducer.file as File
    );
    yield put(upActions.uploadFileSuccessAction(resKey as string));
  } catch (error) {
    yield put(upActions.uploadFileFailedAction(true));
  }
}

export default function* watchUpload(): Generator {
  yield takeEvery(actionTypes.UPLOAD_FILE, uploadAsync);
}
