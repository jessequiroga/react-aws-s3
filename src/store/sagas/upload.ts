import { takeEvery, fork, call, put, take, select } from "redux-saga/effects";
import { eventChannel, END, EventChannel } from "redux-saga";
import { actionTypes } from "../actions/upload";
import * as actions from "../actions/upload";
import uploadFile from "../../api/FileUpload";
import { RootState } from "..";

type uploaderType = {
  prom: Promise<string>;
  channel: EventChannel<number | END>;
};

function createUploader(file: File): uploaderType {
  let emit: { (arg0: number): void; (input: END): void };

  const chan: EventChannel<number | END> = eventChannel(emitter => {
    emit = emitter;
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
    return () => {};
  });

  const uploadProgressCb = (proc: number): void => {
    console.log(`Proc callback: ${proc}`);
    emit(proc);
    if (proc === 100) {
      emit(END);
    }
  };

  const uploadPromise: Promise<string> = uploadFile(file, uploadProgressCb);
  return { prom: uploadPromise, channel: chan };
}

function* uploadProgressWatcher(chan: EventChannel<number | END>): Generator {
  while (true) {
    const progress = yield take(chan);
    yield put(actions.uploadFileProgressAction(progress as number));
  }
}

function* uploadAsync(): Generator {
  console.log("uploadAsync");
  yield put(actions.uploadFileStartAction());

  const state = yield select();
  console.log(state);
  try {
    const { file } = (state as RootState).uploadReducer;
    const uploader = yield call(createUploader, file as File);
    yield fork(uploadProgressWatcher, (uploader as uploaderType).channel);
    const res = yield call(() => (uploader as uploaderType).prom);
    yield put(actions.uploadFileSuccessAction(res as string));
  } catch (error) {
    const errMess = error.message;
    yield put(actions.uploadFileFailedAction(errMess));
  }
}

export default function* watchUpload(): Generator {
  yield takeEvery(actionTypes.UPLOAD_FILE, uploadAsync);
}
