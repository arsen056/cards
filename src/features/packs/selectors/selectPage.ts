import {AppRootStateType} from "../../../app/store";

export const selectPage = (state: AppRootStateType):number => state.packs.page