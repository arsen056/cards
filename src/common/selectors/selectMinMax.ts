import {AppRootStateType} from "../../app/store";

export const selectMin = (state: AppRootStateType):number => state.packs.min
export const selectMax = (state: AppRootStateType):number => state.packs.max