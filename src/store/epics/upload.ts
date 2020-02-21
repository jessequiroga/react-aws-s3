import { ActionsObservable, StateObservable, ofType } from "redux-observable";
import { from } from "rxjs";
import { AnyAction } from "redux";
import { mergeMap, map, withLatestFrom } from "rxjs/operators";
import { actionTypes } from "../actions/upload";
import * as upactions from "../actions/upload";
import uploadFile from "../../api/uploadFileAWS";
import { RootState } from "..";

// eslint-disable-next-line import/prefer-default-export
export const UploadFileSubmitEpic = (
  actions$: ActionsObservable<AnyAction>,
  state$: StateObservable<RootState>
) => {
  // console.log("tttt "+ store.getState());
  return actions$.pipe(
    ofType(actionTypes.UPLOAD_FILE),
    withLatestFrom(state$),
    mergeMap(([actions, state]) => {
      console.log("actions.type ", actions.type);
      if (state.handleActions.file) {
        return from(uploadFile(state.handleActions.file)).pipe(
          map(response => upactions.uploadFileSuccessAction(response as string))
        );
      }
      return actions.uploadFileFailedAction(true);
    })
  );
};
