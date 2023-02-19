import {signInAC} from "features/auth/signIn/loginReducer";
import {setProfile} from "features/profile/profileReducer";
import {AppThunk} from "./store";
import {SignInAPI} from "features/auth/authAPI";

export const initState: AppStateType = {
  status: 'idle',
  isLoggedIn: false,
  isInit: false,
  error: ''
}

export type AppStateType = {
  status: AppStatusType
  isLoggedIn: boolean,
  isInit: boolean
  error: string
}

export type AppStatusType = 'idle' | 'loading' | 'success'

export const appReducer = (state = initState, action: AppActionsType) => {
  switch (action.type) {
    case "APP/SET_STATUS":
      return {...state, status: action.status}
    case "APP/SET_LOGGED_IN":
      return {...state, isLoggedIn: action.isLogged}
    case "APP/SET_ERROR":
      return {...state, error: action.error}
    case "APP/SET_IS_INIT":
      return {...state, isInit: action.init}
    default:
      return state
  }
}

export const setStatus = (status: AppStatusType) => ({type: 'APP/SET_STATUS', status} as const)
export const setLoggedIn = (isLogged: boolean) => ({type: 'APP/SET_LOGGED_IN', isLogged} as const)
export const setIsInit = (init: boolean) => ({type: 'APP/SET_IS_INIT', init} as const)
export const setError = (error: string) => ({type: 'APP/SET_ERROR', error} as const)

export const initializeAppTC = (): AppThunk => async dispatch => {
  dispatch(setStatus('loading'))
  try {
    const res = await SignInAPI.me()
    dispatch(signInAC(true))
    dispatch(setLoggedIn(true))
    dispatch(setProfile(res.data))
  } catch (e) {

  } finally {
    dispatch(setIsInit(true))
    dispatch(setStatus('success'))
  }
}

export type AppActionsType = ReturnType<typeof setStatus>
  | ReturnType<typeof setLoggedIn>
  | ReturnType<typeof setIsInit>
  | ReturnType<typeof setError>