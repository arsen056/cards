import {AppRootStateType} from "../../app/store";

export const selectName = (state: AppRootStateType):string => state.profile.name