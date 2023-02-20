import {AxiosError} from 'axios'

import {AddCardType, cardsAPI, CardType, UpdateCardType} from './CardsAPI'

import {setStatus} from 'app/appReducer'
import {AppThunk} from 'app/store'
import {errorUtils} from 'common/utils/errorUtils'
import {PacksAPI} from 'features/packs/PacksAPI'

const initState = {
    cards: [] as CardType[],
    packUserId: '' as string,
    cardsTotalCount: 0 as number,
    page: 1 as number,
    pageCount: 4 as number,
    packName: '' as string,
    sortPacks: null as string | null,
    isDeleted: false as boolean,
    cardQuestion: '' as string,
    isCardsLoading: false as boolean,
}

export type CardsStateType = typeof initState

export const cardsReducer = (
    state: CardsStateType = initState,
    action: CardsActionsType
): CardsStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARDS':
            return {
                ...state,
                cards: action.cards,
                cardsTotalCount: action.cardsTotalCount,
                packName: action.packName,
                packUserId: action.packUserId,
            }
        case 'CARDS/SET_PAGE':
            return {
                ...state,
                page: action.pageCardsNumber,
            }
        case 'CARDS/SET_PAGE_COUNT':
            return {
                ...state,
                pageCount: action.cardsPageCount,
            }
        case 'CARDS/UPDATE_PACK_NAME':
            return {...state, packName: action.name}
        case 'CARDS/SET_IS_DELETED':
            return {...state, isDeleted: action.deleted}
        case 'CARDS/SET_CARD_QUESTION':
            return {...state, cardQuestion: action.cardQuestion}
        default:
            return state
    }
}

//actions
export const setCards = (
    cards: CardType[],
    cardsTotalCount: number,
    packName: string,
    packUserId: string
) =>
    ({
        type: 'CARDS/SET_CARDS',
        cards,
        cardsTotalCount,
        packName,
        packUserId,
    } as const)
export const setCardsPage = (pageCardsNumber: number) =>
    ({type: 'CARDS/SET_PAGE', pageCardsNumber} as const)
export const setCardsPageCount = (cardsPageCount: number) =>
    ({type: 'CARDS/SET_PAGE_COUNT', cardsPageCount} as const)
export const addCard = (newCard: CardType) => ({type: 'CARDS/ADD_CARD', newCard} as const)
export const updatePackName = (name: string) => ({type: 'CARDS/UPDATE_PACK_NAME', name} as const)
export const setIsDeleted = (deleted: boolean) =>
    ({type: 'CARDS/SET_IS_DELETED', deleted} as const)
export const setCardQuestion = (cardQuestion: string) =>
    ({type: 'CARDS/SET_CARD_QUESTION', cardQuestion} as const)

//thunks
export const getCards =
    (packId: string | undefined): AppThunk =>
        async (dispatch, getState) => {
            const {page, pageCount, sortPacks, cardQuestion} = getState().cards

            dispatch(setStatus('loading'))
            if (packId) {
                try {
                    const res = await cardsAPI.fetchCards({page, pageCount, sortPacks, cardQuestion}, packId)
                    const {cards, cardsTotalCount, packName, packUserId} = res.data

                    dispatch(setCards(cards, cardsTotalCount, packName, packUserId))
                } catch (e) {
                    const err = e as Error | AxiosError<{ error: string }>

                    errorUtils(err, dispatch)
                } finally {
                    dispatch(setStatus('success'))
                }
            }
        }
export const addCardTC =
    (newCard: AddCardType): AppThunk =>
        async (dispatch, getState) => {
            const {page, pageCount, sortPacks, cardQuestion} = getState().cards

            dispatch(setStatus('loading'))
            try {
                await cardsAPI.addPack(newCard)
                const res = await cardsAPI.fetchCards(
                    {page, pageCount, sortPacks, cardQuestion},
                    newCard.card.cardsPack_id
                )
                const {cards, cardsTotalCount, packName, packUserId} = res.data

                dispatch(setCards(cards, cardsTotalCount, packName, packUserId))
            } catch (e) {
                const err = e as Error | AxiosError<{ error: string }>

                errorUtils(err, dispatch)
            } finally {
                dispatch(setStatus('success'))
            }
        }
export const deleteCardTC =
    (cardId: string, packId: string): AppThunk =>
        async (dispatch, getState) => {
            const {page, pageCount, sortPacks} = getState().cards

            dispatch(setStatus('loading'))
            try {
                await cardsAPI.deleteCard(cardId)
                const res = await cardsAPI.fetchCards({page, pageCount, sortPacks}, packId)
                const {cards, cardsTotalCount, packName, packUserId} = res.data

                dispatch(setCards(cards, cardsTotalCount, packName, packUserId))
            } catch (e) {
                const err = e as Error | AxiosError<{ error: string }>

                errorUtils(err, dispatch)
            } finally {
                dispatch(setStatus('success'))
            }
        }

export const updateCardTC =
    (date: UpdateCardType, packId: string): AppThunk =>
        async (dispatch, getState) => {
            const {page, pageCount, sortPacks} = getState().cards

            dispatch(setStatus('loading'))
            try {
                await cardsAPI.updateCard(date)
                const res = await cardsAPI.fetchCards({page, pageCount, sortPacks}, packId)
                const {cards, cardsTotalCount, packName, packUserId} = res.data

                dispatch(setCards(cards, cardsTotalCount, packName, packUserId))
            } catch (e) {
                const err = e as Error | AxiosError<{ error: string }>

                errorUtils(err, dispatch)
            } finally {
                dispatch(setStatus('success'))
            }
        }

export const updatePackNameTC =
    (name: string, id: string): AppThunk =>
        async dispatch => {
            dispatch(setStatus('loading'))
            const data = {
                cardsPack: {
                    _id: id,
                    name: name,
                },
            }

            try {
                await PacksAPI.editPack(data)
                dispatch(updatePackName(name))
            } catch (e) {
                const err = e as Error | AxiosError<{ error: string }>

                errorUtils(err, dispatch)
            } finally {
                dispatch(setStatus('success'))
            }
        }

export const deletePackInCards =
    (id: string): AppThunk =>
        async dispatch => {
            dispatch(setStatus('loading'))
            try {
                await PacksAPI.deletePack(id)
                dispatch(setIsDeleted(true))
            } catch (e) {
                const err = e as Error | AxiosError<{ error: string }>

                errorUtils(err, dispatch)
            } finally {
                dispatch(setStatus('success'))
            }
        }

//types
export type CardsActionsType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setCardsPage>
    | ReturnType<typeof setCardsPageCount>
    | ReturnType<typeof addCard>
    | ReturnType<typeof updatePackName>
    | ReturnType<typeof setIsDeleted>
    | ReturnType<typeof setCardQuestion>
