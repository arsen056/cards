import { AxiosError } from 'axios'

import { ProfileAPI } from './ProfileAPI'

import { setError, setStatus } from 'app/appReducer'
import { AppThunk } from 'app/store'
import { errorUtils } from 'common/utils/errorUtils'
import { ProfileType } from 'features/auth/authAPI'

const initState = {
  name: 'Name',
  email: 'Email',
  avatar: '' as string,
} as ProfileType

export const profileReducer = (state = initState, action: ProfileActionsType) => {
  switch (action.type) {
    case 'PROFILE/SET_PROFILE':
      return { ...state, ...action.profile }
    case 'PROFILE/EDIT_NAME':
      return { ...state, name: action.name }
    case 'PROFILE/EDIT_AVATAR':
      return { ...state, avatar: action.avatar }
    default:
      return state
  }
}

export const setProfile = (profile: ProfileType) =>
  ({ type: 'PROFILE/SET_PROFILE', profile } as const)
export const editName = (name: string) => ({ type: 'PROFILE/EDIT_NAME', name } as const)
export const editAvatar = (avatar: string) => ({ type: 'PROFILE/EDIT_AVATAR', avatar } as const)

export const changeProfile =
  (name: string, avatar: string): AppThunk =>
  async dispatch => {
    setStatus('loading')
    try {
      const res = await ProfileAPI.changeProfile(name, avatar)

      dispatch(editName(res.data.updatedUser.name))
      dispatch(editAvatar(res.data.updatedUser.avatar))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
      dispatch(setError(`The file is too large`))
    } finally {
      setStatus('success')
    }
  }

export type ProfileActionsType =
  | ReturnType<typeof setProfile>
  | ReturnType<typeof editName>
  | ReturnType<typeof editAvatar>
