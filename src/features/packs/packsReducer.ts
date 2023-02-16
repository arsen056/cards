import {AddCardsPack, PacksAPI, PacksResponseType, PackType, UpdatePackType} from "./PacksAPI";
import {AppThunk} from "../../app/store";
import {setStatus} from "../../app/appReducer";
import {AxiosError} from "axios";
import {errorUtils} from "../../common/utils/errorUtils";

const initState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0 as number,
    maxCardsCount: 0 as number,
    minCardsCount: 0 as number,
    isDisabled: false,
    cardsCount: [1, 30] as Array<number>,
    searchParams: {
        sortPacks: null as string | null,
        min: 0 as number,
        max: 20 as number,
        packName: '' as string,
        page: 1 as number,
        pageCount: 8 as number,
        user_id: null as string | null,
        isMyPacks: false as boolean
    }
}

export type PacksStateType = typeof initState

export const packsReducer = (state: PacksStateType = initState, action: PacksActionsType): PacksStateType => {
    switch (action.type) {
        case "PACKS/SET_PACKS":
            return {
                ...state,
                cardPacks: action.packs,
                maxCardsCount: action.maxCardsCount,
                minCardsCount: action.minCardsCount,
                cardPacksTotalCount: action.cardPacksTotalCount
            }
        case "PACKS/SET_PACK_NAME":
            return {...state, searchParams: {...state.searchParams, packName: action.packName}}
        case "PACKS/SET_USER_ID":
            return {...state, searchParams: {...state.searchParams, user_id: action.userID}}
        case "PACKS/SET_MIN":
            return {...state, searchParams: {...state.searchParams, min: action.min}}
        case "PACKS/SET_MAX":
            return {...state, searchParams: {...state.searchParams, max: action.max}}
        case "PACKS/SET_PAGE":
            return {...state, searchParams: {...state.searchParams, page: action.page}}
        case "PACKS/SET_PAGE_COUNT":
            return {...state, searchParams: {...state.searchParams, pageCount: action.pageCount}}
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
        case "PACK/IS_MY_PACK":
            return {...state, searchParams: {...state.searchParams, isMyPacks: action.isMyPacks}}
        case "PACK/SET_RESET_FILTERS":
            return {...state, searchParams: {...state.searchParams, ...action.filters}}
        default:
            return state
    }
}

export const setPacks = (packs: PackType[], cardPacksTotalCount: number, maxCardsCount: number, minCardsCount: number) => {
    return {type: 'PACKS/SET_PACKS', packs, maxCardsCount, minCardsCount, cardPacksTotalCount} as const
}
export const setPackName = (packName: string) => ({type: 'PACKS/SET_PACK_NAME', packName} as const)
export const setUserId = (userID: string | null) => ({type: 'PACKS/SET_USER_ID', userID} as const)
export const setMin = (min: number) => ({type: 'PACKS/SET_MIN', min} as const)
export const setMax = (max: number) => ({type: 'PACKS/SET_MAX', max} as const)
export const setPage = (page: number) => ({type: 'PACKS/SET_PAGE', page} as const)
export const setPageCount = (pageCount: number) => ({type: 'PACKS/SET_PAGE_COUNT', pageCount} as const)
export const addPackAC = (newCardsPack: PackType) => ({type: 'PACKS/ADD-PACKS', newCardsPack} as const)
export const updatePackAC = (data: PackType) => ({type: 'PACKS/UPDATE-PACKS', data} as const)
export const deletePackAC = (idPack: string) => ({type: 'PACKS/DELETE-PACKS', idPack} as const)
export const getCardsPackAC = (data: PacksResponseType) => ({ type: "PACK/GET_CARDS_PACK", data } as const);
export const setIsMyPacks = (isMyPacks: boolean) => ({ type: "PACK/IS_MY_PACK", isMyPacks} as const);
export const setResetFilters = () => ({ type: "PACK/SET_RESET_FILTERS", filters: {
        packName:'',
        user_id: '',
        min: 0,
        max: 20,
        page: 1,
        isMyPacks: false
    }} as const);

export type PacksActionsType =
    ReturnType<typeof setPacks>
    | ReturnType<typeof setPackName>
    | ReturnType<typeof setUserId>
    | ReturnType<typeof setMin>
    | ReturnType<typeof setMax>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof addPackAC>
    | ReturnType<typeof updatePackAC>
    | ReturnType<typeof deletePackAC>
    | ReturnType<typeof getCardsPackAC>
    | ReturnType<typeof setIsMyPacks>
    | ReturnType<typeof setResetFilters>

export const getPacks = (): AppThunk => async (dispatch, getState) => {
    const {sortPacks, pageCount, page, packName, min, max, user_id} = getState().packs.searchParams
    try {
        dispatch(setStatus('loading'))
        const res = await PacksAPI.fetchPacks({sortPacks, pageCount, page, min, max, user_id, packName})
        const {cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount} = res.data
        dispatch(setPacks(cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount))
    } catch (err) {
        errorUtils(err as Error | AxiosError, dispatch)
    } finally {
        dispatch(setStatus('success'))
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
            await PacksAPI.editPack(data)
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