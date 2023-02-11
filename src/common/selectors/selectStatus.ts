import {AppRootStateType} from "../../app/store";
import {AppStatusType} from "../../app/appReducer";

export const selectStatus = (state: AppRootStateType): AppStatusType => state.app.status