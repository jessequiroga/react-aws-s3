import { takeEvery, call, put, select } from "redux-saga/effects";
import { actionTypes } from "../actions/download";
import * as actions from "../actions/download";
import downloadFile from "../../api/FileDownload";
import { RootState } from "..";

function* downloadAsync(): Generator {
  console.log("downloadAsync");
  yield put(actions.downloadFileStartAction());
  const state = yield select();
  try {
    const resData = yield call(
      downloadFile,
      (state as RootState).downloadReducer.key as string
    );
    yield put(actions.downloadFileSuccessAction(resData as string));
  } catch (error) {
    yield put(actions.downloadFileFailedAction(error));
  }
}

export default function* watchDownload(): Generator {
  yield takeEvery(actionTypes.DOWNLOAD_FILE, downloadAsync);
}
