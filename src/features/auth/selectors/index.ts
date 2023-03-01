import { AppRootStateType } from 'app/store'

export const selectForgotStatus = (state: AppRootStateType): boolean => state.forgot.forgotStatus
export const selectAvatarFromState = (state: AppRootStateType): string => state.profile.avatar
