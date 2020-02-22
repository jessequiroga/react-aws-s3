import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  selectedFileAction,
  uploadFileAction
} from "../../store/actions/upload";
import { FileUploadState } from "../../store/reducers/upload";
import { RootState } from "../../store";

export function useUploadState(): FileUploadState {
  const uploadState = useSelector((state: RootState) => state.uploadReducer);
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
