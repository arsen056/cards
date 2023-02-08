import {LoginParamsType, SignInAPI} from "./SignInAPI";
import {AppThunk} from "../../../app/store";
import {setError, setLoggedIn, setStatus} from "../../../app/appReducer";
import axios, {AxiosError} from "axios";
import {errorUtils} from "../../../common/utils/errorUtils";
import {setProfile} from "../../Profile/profileReducer";

const initialState = {
  isLoggedIn: false
}
type initialStateType = typeof initialState

export const loginReducer = (state: initialStateType = initialState, action: SignInACType): initialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}

// actions
export const signInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const signInTC = (data: LoginParamsType): AppThunk => async dispatch => {
  dispatch(setStatus('loading'))
  try {
    const res = await SignInAPI.login(data)
    dispatch(signInAC(true))
    dispatch(setLoggedIn(true))
    dispatch(setProfile(res.data))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>
    errorUtils(err, dispatch)
  } finally {
    dispatch(setStatus('success'))
  }
}

export const logoutTC = (): AppThunk => async dispatch => {
  dispatch(setStatus('loading'))
  try {
    await SignInAPI.logout()
    dispatch(signInAC(false))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message
      dispatch(setError(error))
    } else {
      dispatch(setError(`Native error ${err.message}`))
    }
  } finally {
    dispatch(setStatus('success'))
  }
}

// types
export type SignInACType = ReturnType<typeof signInAC>