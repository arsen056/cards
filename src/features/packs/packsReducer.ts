import {PacksAPI, PackType} from "./PacksAPI";
import {AppThunk} from "../../app/store";
import {setStatus} from "../../app/appReducer";
import {AxiosError} from "axios";
import {errorUtils} from "../../common/utils/errorUtils";


const initState = {
  cardPacks: [] as PackType[],
  cardPacksTotalCount: 0 as number,
  min: 0 as number,
  max: 20 as number,
  packName: null as string | null,
  page: 1 as number,
  pageCount: 8 as number,
  sortPacks: null as string | null,
  user_id: null as string | null
}

export type PacksStateType = typeof initState

export const packsReducer = (state:PacksStateType = initState, action: PacksActionsType):PacksStateType => {
  switch (action.type) {
    case "PACKS/SET_PACKS":
      return {...state, cardPacks: action.packs}
    case "PACKS/SET_PACK_NAME":
      return {...state, packName: action.packName}
    case "PACKS/SET_USER_ID":
      return {...state, user_id: action.userID}
    default:
      return state
  }
}

export const setPacks = (packs: PackType[]) => ({type:'PACKS/SET_PACKS', packs} as const)
export const setPackName = (packName: string) => ({type: 'PACKS/SET_PACK_NAME', packName} as const)
export const setUserId = (userID: string | null) => ({type: 'PACKS/SET_USER_ID', userID} as const)
export type PacksActionsType = ReturnType<typeof setPacks> | ReturnType<typeof setPackName> | ReturnType<typeof setUserId>

export const getPacks = (): AppThunk => async (dispatch, getState) => {
  const {sortPacks, pageCount, page, packName, min, max, user_id} = getState().packs


  try {
    setStatus('loading')
    const res = await PacksAPI.fetchPacks({sortPacks, pageCount, page, packName, min, max, user_id})
    dispatch(setPacks(res.data.cardPacks))
  } catch (err) {
    errorUtils(err as Error | AxiosError, dispatch)
  } finally {
    setStatus('success')
  }
}