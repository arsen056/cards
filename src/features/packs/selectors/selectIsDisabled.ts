import {AppRootStateType} from "../../../app/store";

export const selectIsDisabled = (state: AppRootStateType):boolean => state.packs.isDisabled
export const searchParamsSelector = (state: AppRootStateType) => state.packs.searchParams