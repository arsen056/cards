import {PacksAPI, PackType} from "./PacksAPI";
import {AppThunk} from "../../app/store";
import {setStatus} from "../../app/appReducer";
import {AxiosError} from "axios";
import {errorUtils} from "../../common/utils/errorUtils";


const initState = {
  cardPacks: [] as PackType[],
  page: 1 as number,
  pageCount: 0 as number,
  cardPacksTotalCount: 0 as number,
  minCardsCount: 0 as number,
  maxCardsCount: 0 as number
}


export type PacksStateType = typeof initState

export const packsReducer = (state:PacksStateType = initState, action: PacksActionsType):PacksStateType => {
  switch (action.type) {
    case "PACKS/SET_PACKS":
      return {...state, cardPacks: action.packs}
    default:
      return state
  }
}

export const setPacks = (packs: PackType[]) => ({type:'PACKS/SET_PACKS', packs} as const)
export type PacksActionsType = ReturnType<typeof setPacks>

export const getPacks = (): AppThunk => async dispatch => {
  try {
    setStatus('loading')
    const res = await PacksAPI.fetchPacks()
    dispatch(setPacks(res.data.cardPacks))
  } catch (err) {
    errorUtils(err as Error | AxiosError, dispatch)
  } finally {
    setStatus('success')
  }
}