import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { downloadFileAction } from "../store/actions/download";
import { FileDownloadState } from "../store/reducers/download";
import { RootState } from "../store";

export function useDownloadState(): FileDownloadState {
  const downloadState = useSelector(
    (state: RootState) => state.downloadReducer
  );
  return downloadState;
}

export function useDownloadFileAction() {
  const dispatch = useDispatch();
  const onDownload = useCallback(
    (key: string) => {
      dispatch(downloadFileAction(key));
    },
    [dispatch]
  );
  return onDownload;
}
