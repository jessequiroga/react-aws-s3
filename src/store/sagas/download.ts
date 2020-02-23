import { takeEvery, fork, call, put, take, select } from "redux-saga/effects";
import { eventChannel, END, EventChannel } from "redux-saga";
import { actionTypes } from "../actions/download";
import * as actions from "../actions/download";
import downloadFile from "../../api/FileDownload";
import { RootState } from "..";

type downloaderType = {
  prom: Promise<string>;
  channel: EventChannel<number | END>;
};

function createDownloader(fileKey: string): downloaderType {
  let emit: { (arg0: number): void; (input: END): void };

  const chan: EventChannel<number | END> = eventChannel(emitter => {
    emit = emitter;
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-function-return-type
    return () => {};
  });

  const downloadProgressCb = (proc: number): void => {
    console.log(`Proc callback: ${proc}`);
    emit(proc);
    if (proc === 100) {
      emit(END);
    }
  };

  const downloadPromise: Promise<string> = downloadFile(
    fileKey,
    downloadProgressCb
  );
  return { prom: downloadPromise, channel: chan };
}

function* downloadProgressWatcher(chan: EventChannel<number | END>): Generator {
  while (true) {
    const progress = yield take(chan);
    yield put(actions.downloadFileProgressAction(progress as number));
  }
}

function* downloadAsync(): Generator {
  console.log("downloadAsync");
  yield put(actions.downloadFileStartAction());

  const state = yield select();
  try {
    const downloader = yield call(
      createDownloader,
      (state as RootState).downloadReducer.key
    );
    yield fork(downloadProgressWatcher, (downloader as downloaderType).channel);
    const res = yield call(() => (downloader as downloaderType).prom);
    yield put(actions.downloadFileSuccessAction(res as string));
  } catch (error) {
    yield put(actions.downloadFileFailedAction(error));
  }
}

export default function* watchDownload(): Generator {
  yield takeEvery(actionTypes.DOWNLOAD_FILE, downloadAsync);
}
