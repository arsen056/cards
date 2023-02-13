import {AppRootStateType} from "../../../app/store";
import {PackType} from "../PacksAPI";

export const selectCardPacks = (state: AppRootStateType): PackType[] => state.packs.cardPacks