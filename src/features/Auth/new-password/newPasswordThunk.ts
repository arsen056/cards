import {AppThunk} from "../../../app/store";
import {setStatus} from "../../../app/appReducer";
import {AxiosError} from "axios";
import {errorUtils} from "../../../common/utils/errorUtils";
import {NewPasswordAPI} from "./NewPasswordAPI";
import {setForgotStatus} from "../forgot-password/forgotReducer";


export const newPasswordThunk = (password: string, resetPasswordToken: string): AppThunk => async dispatch => {
  dispatch(setStatus('loading'))
  try {
    await NewPasswordAPI.newPass(password, resetPasswordToken)
    dispatch(setForgotStatus(true))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>
    errorUtils(err, dispatch)
  } finally {
    dispatch(setStatus('success'))
  }
}