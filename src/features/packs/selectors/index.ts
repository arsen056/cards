import {AppRootStateType} from "../../../app/store";
import {PackType} from "../PacksAPI";

export const selectCardPacks = (state: AppRootStateType): PackType[] => state.packs.cardPacks
export const selectCardPacksTotaCount = (state: AppRootStateType):number => state.packs.cardPacksTotalCount
export const selectMin = (state: AppRootStateType):number => state.packs.searchParams.min
export const selectMax = (state: AppRootStateType):number => state.packs.searchParams.max
export const selectMinCardsCount = (state: AppRootStateType):number => state.packs.minCardsCount
export const selectMaxCardsCount = (state: AppRootStateType):number => state.packs.maxCardsCount
export const selectIsMyPacks = (state: AppRootStateType):boolean => state.packs.searchParams.isMyPacks
export const searchParamsSelector = (state: AppRootStateType) => state.packs.searchParams.packName
export const selectPackName = (state: AppRootStateType): string | null => state.packs.searchParams.packName
export const selectPage = (state: AppRootStateType):number => state.packs.searchParams.page
export const selectPageCount = (state: AppRootStateType):number => state.packs.searchParams.pageCount
export const selectUserID = (state: AppRootStateType) => state.profile._id
export const selectPacksUserID = (state: AppRootStateType) => state.packs.searchParams.user_id


