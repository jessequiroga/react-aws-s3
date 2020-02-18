import { createAction } from 'redux-actions';

export const UPLOAD_FILE = 'UPLOAD_FILE';
export const UPLOAD_FILE_START = `${UPLOAD_FILE}_START`;
export const UPLOAD_FILE_SUCCESS = `${UPLOAD_FILE}_SUCCESS`;
export const UPLOAD_FILE_FAILED = `${UPLOAD_FILE}_FAILED`;

// 액션 생성자
//export const upoadFile = createAction(UPLOAD_FILE);   // file
// export const uploadFileStart = createAction(UPLOAD_FILE_START); // 
// export const uploadFileSuccess = createAction(UPLOAD_FILE_SUCCESS); // 
// export const uploadFileFailed = createAction(UPLOAD_FILE_FAILED); // 


export const uploadFile = (file: File) => ({
    type: UPLOAD_FILE,
    payload: {
        file,
    },
});

export const uploadFileStart = () => ({
    type: UPLOAD_FILE_START,
});

export const uploadFileSuccess = () => ({
    type: UPLOAD_FILE_SUCCESS,
    // payload: {
    //     result,
    // },
});

export const uploadFileFailed = (error: boolean) => ({
    type: UPLOAD_FILE_FAILED,
    payload: {
        error,
    },
    error: true,
});
