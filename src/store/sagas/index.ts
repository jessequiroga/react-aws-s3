import { all, fork } from "redux-saga/effects";
import watchUpload from "./upload";
import watchDownload from "./download";

export default function* rootSaga() {
  yield all([fork(watchUpload), fork(watchDownload)]);
}
