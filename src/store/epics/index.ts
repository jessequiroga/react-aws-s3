import { combineEpics } from "redux-observable";
import { UploadFileSubmitEpic } from "./upload";

const epics = combineEpics(UploadFileSubmitEpic);

export default epics;
