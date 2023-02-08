import {AppThunk} from "../../app/store";
import {ProfileType, SignInAPI} from "../Auth/sign-in/SignInAPI";
import {setStatus} from "../../app/appReducer";
import {errorUtils} from "../../common/utils/errorUtils";
import {AxiosError} from "axios";
import {ProfileAPI} from "./ProfileAPI";

const initState = {name: 'Name', email: 'Email'} as ProfileType

export const profileReducer = (state = initState, action: ProfileActionsType) => {
  switch (action.type) {
    case "PROFILE/SET_PROFILE":
      return {...state, ...action.profile}
    case "PROFILE/EDIT_NAME":
      return {...state, name: action.name}
    default:
      return state
  }
}

export const setProfile = (profile: ProfileType) => ({type: 'PROFILE/SET_PROFILE', profile} as const)
export const editName = (name: string) => ({type: 'PROFILE/EDIT_NAME', name} as const)

export const fetchProfile = (): AppThunk => async dispatch => {
  try {
    setStatus('loading')
    const res = await SignInAPI.me()
    dispatch(setProfile(res.data))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>
    errorUtils(err, dispatch)
  } finally {
    setStatus('success')
  }
}

export const changeProfile = (name: string, avatar: string): AppThunk => async dispatch => {
  setStatus('loading')
  try {
    const res = await ProfileAPI.changeProfile(name, avatar)
    dispatch(editName(res.data.updatedUser.name))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>
    errorUtils(err, dispatch)
  } finally {
    setStatus('success')
  }
}

export type ProfileActionsType = ReturnType<typeof setProfile> | ReturnType<typeof editName>