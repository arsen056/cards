import { AxiosError } from 'axios'

import { setStatus } from '../../../app/appReducer'
import { AppThunk } from '../../../app/store'
import { errorUtils } from '../../../common/utils/errorUtils'
import { ForgotAPI } from '../authAPI'

const initState: ForgotStateType = {
  forgotStatus: false,
}

export type ForgotStateType = {
  forgotStatus: boolean
}

export const forgotReducer = (state = initState, action: ForgotActionType) => {
  switch (action.type) {
    case 'FORGOT/SET_FORGOT_STATUS':
      return { ...state, forgotStatus: action.forgotStatus }
    default:
      return state
  }
}

export type ForgotActionType = ReturnType<typeof setForgotStatus>

export const setForgotStatus = (forgotStatus: boolean) =>
  ({ type: 'FORGOT/SET_FORGOT_STATUS', forgotStatus } as const)

export const forgotPassword =
  (email: string): AppThunk =>
  async dispatch => {
    dispatch(setStatus('loading'))
    try {
      await ForgotAPI.forgotPass(email)
      dispatch(setForgotStatus(true))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
    } finally {
      dispatch(setStatus('success'))
    }
  }
