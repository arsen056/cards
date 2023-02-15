import {AppRootStateType} from "../../../app/store";

export const selectIsMyPacks = (state: AppRootStateType):boolean => state.packs.isMyPacks
export const searchParamsSelector = (state: AppRootStateType) => state.packs.searchParams.packName