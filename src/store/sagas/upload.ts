import { takeEvery, call, put, select } from "redux-saga/effects";
import { actionTypes } from "../actions/upload";
import * as actions from "../actions/upload";
import uploadFile from "../../api/FileUpload";
import { RootState } from "..";

function* uploadAsync(): Generator {
  console.log("uploadAsync");
  yield put(actions.uploadFileStartAction());
  const state = yield select();

  try {
    const resUrl = yield call(
      uploadFile,
      (state as RootState).uploadReducer.file as File
    );
    yield put(actions.uploadFileSuccessAction(resUrl as string));
  } catch (error) {
    yield put(actions.uploadFileFailedAction(true));
  }
}

export default function* watchUpload(): Generator {
  yield takeEvery(actionTypes.UPLOAD_FILE, uploadAsync);
}
