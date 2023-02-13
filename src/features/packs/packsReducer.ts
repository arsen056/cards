import {PacksAPI, PackType} from "./PacksAPI";
import {AppThunk} from "../../app/store";
import {setStatus} from "../../app/appReducer";
import {AxiosError} from "axios";
import {errorUtils} from "../../common/utils/errorUtils";


const initState = {
  cardPacks: [] as PackType[],
  cardPacksTotalCount: 0 as number,
  maxCardsCount: 0 as number,
  minCardsCount: 0 as number,
  min: 0 as number,
  max: 20 as number,
  packName: '' as string,
  page: 1 as number,
  pageCount: 8 as number,
  sortPacks: null as string | null,
  user_id: null as string | null
}

export type PacksStateType = typeof initState

export const packsReducer = (state: PacksStateType = initState, action: PacksActionsType): PacksStateType => {
  switch (action.type) {
    case "PACKS/SET_PACKS":
      return {...state,
        cardPacks: action.packs,
        maxCardsCount: action.maxCardsCount,
        minCardsCount: action.minCardsCount,
        cardPacksTotalCount: action.cardPacksTotalCount
      }
    case "PACKS/SET_PACK_NAME":
      return {...state, packName: action.packName}
    case "PACKS/SET_USER_ID":
      return {...state, user_id: action.userID}
    case "PACKS/SET_MIN":
      return {...state, min: action.min}
    case "PACKS/SET_MAX":
      return {...state, max: action.max}
    case "PACKS/SET_PAGE":
      return {...state, page: action.page}
    case "PACKS/SET_PAGE_COUNT":
      return {...state, pageCount: action.pageCount}
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

export type PacksActionsType =
  ReturnType<typeof setPacks>
  | ReturnType<typeof setPackName>
  | ReturnType<typeof setUserId>
  | ReturnType<typeof setMin>
  | ReturnType<typeof setMax>
  | ReturnType<typeof setPage>
  | ReturnType<typeof setPageCount>

export const getPacks = (): AppThunk => async (dispatch, getState) => {
  const {sortPacks, pageCount, page, packName, min, max, user_id} = getState().packs
  try {
    setStatus('loading')
    const res = await PacksAPI.fetchPacks({sortPacks, pageCount, page, min, max, user_id, packName})
    const {cardPacks, cardPacksTotalCount,  maxCardsCount, minCardsCount} = res.data
    dispatch(setPacks(cardPacks, cardPacksTotalCount, maxCardsCount, minCardsCount))
  } catch (err) {
    errorUtils(err as Error | AxiosError, dispatch)
  } finally {
    setStatus('success')
  }
}