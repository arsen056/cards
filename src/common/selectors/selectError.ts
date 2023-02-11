import {AppRootStateType} from "../../app/store";
export const selectError = (state: AppRootStateType):string => state.app.error