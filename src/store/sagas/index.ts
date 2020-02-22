import { all, fork } from "redux-saga/effects";
import watchUpload from "./upload";

export default function* rootSaga() {
  yield all([fork(watchUpload)]);
}
