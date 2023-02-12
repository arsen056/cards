import {AppThunk} from "../../app/store";
import {setStatus} from "../../app/appReducer";
import {AxiosError} from "axios";
import {errorUtils} from "../../common/utils/errorUtils";
import {cardsAPI, CardType} from "./CardsAPI";

const initState = {
		cards: [] as CardType[],
}

export type CardsStateType = typeof initState

export const cardsReducer = (state: CardsStateType = initState, action: CardsActionsType): CardsStateType => {
		switch (action.type) {
				case "CARDS/SET_CARDS":
						return {...state,
								cards: action.cards,
						}
				default:
						return state
		}
}

//actions
export const setCards = (cards: CardType[]) => {
		return {type: 'CARDS/SET_CARDS', cards} as const
}

//thunks
export const getCards = (packId: string | undefined): AppThunk => async dispatch => {
		dispatch(setStatus('loading'))
		if (packId) {try {
				const res = await cardsAPI.fetchCards(packId)
				console.log(res)
				dispatch(setCards(res.data.cards))
		} catch (e) {
				const err = e as Error | AxiosError<{ error: string }>
				errorUtils(err, dispatch)
		} finally {
				dispatch(setStatus('success'))
		}}

}

//types
export type CardsActionsType =
		ReturnType<typeof setCards>


