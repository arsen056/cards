import {AppRootStateType} from "../../../app/store";

export const selectPageCount = (state: AppRootStateType):number => state.packs.pageCount