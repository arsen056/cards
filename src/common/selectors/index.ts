import { AppStatusType } from '../../app/appReducer'
import { AppRootStateType } from '../../app/store'
import { ProfileType } from '../../features/auth/authAPI'

export const selectError = (state: AppRootStateType): string => state.app.error
export const selectIsLoggedIn = (state: AppRootStateType): boolean => state.app.isLoggedIn
export const selectSignUp = (state: AppRootStateType): boolean => state.signUp.signUp
export const selectName = (state: AppRootStateType): string => state.profile.name
export const selectStatus = (state: AppRootStateType): AppStatusType => state.app.status
export const selectUser = (state: AppRootStateType): ProfileType => state.profile
