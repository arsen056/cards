import {AppRootStateType} from "../../app/store";
import {PackType} from "../../features/packs/PacksAPI";

export const selectCardPacks = (state: AppRootStateType): PackType[] => state.packs.cardPacks