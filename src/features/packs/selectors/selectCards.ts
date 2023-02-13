import {AppRootStateType} from "../../../app/store";
import {CardType} from "../../cards/CardsAPI";

export const selectCards = (state: AppRootStateType): CardType[] => state.cards.cards