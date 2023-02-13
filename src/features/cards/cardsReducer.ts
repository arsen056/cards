import {AppThunk} from "../../app/store";
import {setStatus} from "../../app/appReducer";
import {AxiosError} from "axios";
import {errorUtils} from "../../common/utils/errorUtils";
import {AddCardType, cardsAPI, CardType} from "./CardsAPI";

const initState = {
		cards: [] as CardType[],
		cardsTotalCount: 0 as number,
		page: 1 as number,
		pageCount: 4 as number,
		packName: '' as string
}

export type CardsStateType = typeof initState

export const cardsReducer = (state: CardsStateType = initState, action: CardsActionsType): CardsStateType => {
		switch (action.type) {
				case "CARDS/SET_CARDS":
						return {
								...state,
								cards: action.cards,
								cardsTotalCount: action.cardsTotalCount,
								packName: action.packName
						}
				case "CARDS/SET_PAGE":
						return {
								...state,
								page: action.pageCardsNumber
						}
				case "CARDS/SET_PAGE_COUNT":
						return {
								...state,
								pageCount: action.cardsPageCount
						}
				// case "CARDS/ADD_CARD":
				// 		return {
				// 				...state,
				// 				cards: [...state.cards, action.newCard]
				// 		}
				default:
						return state
		}
}

//actions
export const setCards = (cards: CardType[], cardsTotalCount: number, packName: string) => ({
		type: 'CARDS/SET_CARDS',
		cards,
		cardsTotalCount,
		packName
} as const)
export const setCardsPage = (pageCardsNumber: number) => ({type: "CARDS/SET_PAGE", pageCardsNumber} as const)
export const setCardsPageCount = (cardsPageCount: number) => ({type: "CARDS/SET_PAGE_COUNT", cardsPageCount} as const)
export const addCard = (newCard: CardType) => ({type: "CARDS/ADD_CARD", newCard} as const)

//thunks
export const getCards = (packId: string | undefined): AppThunk => async (dispatch) => {
		dispatch(setStatus('loading'))
		if (packId) {
				try {
						const res = await cardsAPI.fetchCards(packId)
						const {cards, cardsTotalCount, packName} = res.data
						dispatch(setCards(cards, cardsTotalCount, packName))
				} catch (e) {
						const err = e as Error | AxiosError<{ error: string }>
						errorUtils(err, dispatch)
				} finally {
						dispatch(setStatus('success'))
				}
		}
}
export const addCardTC = (newCard: AddCardType): AppThunk => async dispatch => {
		dispatch(setStatus('loading'))
		try {
				await cardsAPI.addPack(newCard)
				const res = await cardsAPI.fetchCards(newCard.card.cardsPack_id)
				const {cards, cardsTotalCount, packName} = res.data
				dispatch(setCards(cards, cardsTotalCount, packName))
		} catch (e) {
				const err = e as Error | AxiosError<{ error: string }>
				errorUtils(err, dispatch)
		} finally {
				dispatch(setStatus('success'))
		}
}


//types
export type CardsActionsType =
		ReturnType<typeof setCards>
		| ReturnType<typeof setCardsPage>
		| ReturnType<typeof setCardsPageCount>
		| ReturnType<typeof addCard>



