import {AddCardsPack, PacksAPI, PackType, UpdatePackType} from "../PacksAPI";
import {AppThunk} from "../../../app/store";
import {setStatus} from "../../../app/appReducer";
import {errorUtils} from "../../../common/utils/errorUtils";
import {AxiosError} from "axios";
import {setPacks} from "../packsReducer";


export type InitialStateType = {
    cardPacks: PackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    isDisabled: boolean
    cardsCount: Array<number>
    userId: string
    sortBy: string
    searchedText: string
}
export const initialState: InitialStateType = {
    cardPacks: [],
    page: 1, //выбранная стр
    pageCount: 4, //ко-во стр
    cardPacksTotalCount: 2, // количество колод
    minCardsCount: 0,
    maxCardsCount: 8,
    isDisabled: false,
    cardsCount: [1, 30],
    userId: '',
    sortBy: '0',
    searchedText: '',
}

export const packListReducer = (state: InitialStateType = initialState, action: PacksActionType): InitialStateType => {
    switch (action.type) {
        case 'PACKS/ADD-PACKS':
            return {...state, cardPacks: [...state.cardPacks, action.newCardsPack]}
        case 'PACKS/UPDATE-PACKS':
            return {
                ...state,
                cardPacks: [...state.cardPacks].map(e =>
                    e._id === action.data._id
                        ? {
                            ...e,
                            name: action.data.name,
                        }
                        : e
                ),
            }
        case 'PACKS/DELETE-PACKS':
            return {...state, cardPacks: state.cardPacks.filter(e => e._id !== action.idPack)}
        default:
            return state
    }
}

export const addPackTC = (data: AddCardsPack): AppThunk => async (dispatch, getState) => {
    const {sortPacks, pageCount, page, packName, min, max, user_id} = getState().packs.searchParams
    dispatch(setStatus('loading'))
    try {
        await PacksAPI.addPack(data)
        const res = await PacksAPI.fetchPacks({sortPacks, pageCount, page, min, max, user_id, packName})
        const {cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount} = res.data
        dispatch(setPacks(cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount))
        dispatch(setStatus('success'))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    }
}

export const updatePackTC =
    (data: UpdatePackType): AppThunk => async (dispatch, getState) => {
        const {sortPacks, pageCount, page, packName, min, max, user_id} = getState().packs.searchParams
        dispatch(setStatus('loading'))
        try {
            await PacksAPI.createPack(data)
            const res = await PacksAPI.fetchPacks({sortPacks, pageCount, page, min, max, user_id, packName})
            const {cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount} = res.data
            dispatch(setPacks(cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount))
            dispatch(setStatus('success'))
        } catch (err) {
            errorUtils(err as Error | AxiosError, dispatch)
        }
    }

export const deletePackTC = (id: string): AppThunk => async (dispatch, getState) => {
    const {sortPacks, pageCount, page, packName, min, max, user_id} = getState().packs.searchParams
    dispatch(setStatus('loading'))
    try {
        await PacksAPI.deletePack(id)

        const res = await PacksAPI.fetchPacks({sortPacks, pageCount, page, min, max, user_id, packName})
        const {cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount} = res.data
        dispatch(setPacks(cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount))
        dispatch(setStatus('success'))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    }
}

export const addPackAC = (newCardsPack: PackType) => ({type: 'PACKS/ADD-PACKS', newCardsPack} as const)
export const updatePackAC = (data: PackType) => ({type: 'PACKS/UPDATE-PACKS', data} as const)
export const deletePackAC = (idPack: string) => ({type: 'PACKS/DELETE-PACKS', idPack} as const)

export type PacksActionType =
    | ReturnType<typeof addPackAC>
    | ReturnType<typeof updatePackAC>
    | ReturnType<typeof deletePackAC>
