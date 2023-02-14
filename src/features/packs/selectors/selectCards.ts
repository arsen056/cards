import {AppRootStateType} from "../../../app/store";
import {CardType} from "../../cards/CardsAPI";

export const selectCards = (state: AppRootStateType): CardType[] => state.cards.cards
export const selectCardsTotalCount = (state: AppRootStateType): number => state.cards.cardsTotalCount
export const selectCardsPage = (state: AppRootStateType): number => state.cards.page
export const selectCardsPageCount = (state: AppRootStateType): number => state.cards.pageCount
export const selectCardsPackName = (state: AppRootStateType): string => state.cards.packName
export const selectPackUserId = (state: AppRootStateType): string => state.cards.packUserId