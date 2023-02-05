import {AppThunk} from "../../app/store";
import {SignInAPI} from "../Auth/sign-in/SignInAPI";
import {setError, setStatus} from "../../app/appReducer";


const initState = {name: 'Arsen', email: 'example@mail.ru'} as ProfileStateType

export type ProfileStateType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error?: string;
}

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

export const setProfile = (profile: ProfileStateType) => ({type: 'PROFILE/SET_PROFILE', profile} as const)
export const editName = (name: string) => ({type: 'PROFILE/EDIT_NAME', name} as const)

export const fetchProfile = (): AppThunk => async dispatch => {
  try {
    setStatus('loading')
    const res = await SignInAPI.me()
    dispatch(setProfile(res.data))

  } catch (e: any) {
    setError(e.message)
  } finally {
    setStatus('success')
  }
}

export type ProfileActionsType = ReturnType<typeof setProfile> | ReturnType<typeof editName>
