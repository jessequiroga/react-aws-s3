import {
    UPLOAD_FILE,
    UPLOAD_FILE_START,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAILED,
} from '../action/upload'
import { handleActions } from 'redux-actions';

export interface FileUploadState {
    file: File | null;
    status: string;
    error: boolean;
}
const initialState: FileUploadState = {
    file: null,
    status: 'init',
    error: false
};

export default handleActions({
    [UPLOAD_FILE]: (state: FileUploadState, action) => {
        console.log("upload file");
        return { ...state, file: action.payload.file, status: 'pending', error: false };
    },
    [UPLOAD_FILE_START]: (state: FileUploadState, action) => {
        console.log("upload start");
        return { ...state, status: 'in progress', error: false };
    },
    [UPLOAD_FILE_SUCCESS]: (state: FileUploadState, action) => {
        console.log("upload success");
        return { ...state, status: 'done', error: false };
    },
    [UPLOAD_FILE_FAILED]: (state: FileUploadState, action) => {
        console.log("upload failed");
        return { ...state, status: 'error', error: true };
    }
}, initialState);