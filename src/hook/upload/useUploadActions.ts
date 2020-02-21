import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  selectedFileAction,
  uploadFileAction,
  uploadFileStartAction,
  uploadFileSuccessAction,
  uploadFileFailedAction
} from "../../store/actions/upload";
import { FileUploadState } from "../../store/reducers/upload";
import { RootState } from "../../store";

export function useUploadState(): FileUploadState {
  const uploadState = useSelector((state: RootState) => state.handleActions);
  return uploadState;
}

export function useSelectedFileAction() {
  const dispatch = useDispatch();
  const onSelect = useCallback(
    (file: File) => dispatch(selectedFileAction(file)),
    [dispatch]
  );

  return onSelect;
}

export function useUploadFileAction() {
  const dispatch = useDispatch();
  const onLoad = useCallback(() => {
    dispatch(uploadFileAction());
  }, [dispatch]);
  return onLoad;
}

export function useUploadFileStartAction() {
  const dispatch = useDispatch();
  const onStarted = useCallback(() => dispatch(uploadFileStartAction()), [
    dispatch
  ]);

  return onStarted;
}
export function useUploadFileSuccessAction() {
  const dispatch = useDispatch();
  const onSuccess = useCallback(
    (uploadedUrl: string) => dispatch(uploadFileSuccessAction(uploadedUrl)),
    [dispatch]
  );

  return onSuccess;
}
export function useUploadFileFailedAction() {
  const dispatch = useDispatch();
  const onFailed = useCallback(
    (error: boolean) => dispatch(uploadFileFailedAction(error)),
    [dispatch]
  );

  return onFailed;
}
