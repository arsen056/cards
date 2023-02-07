import {LoginParamsType, SignInAPI} from "./SignInAPI";
import {AppThunk} from "../../../app/store";
import {initializeAppTC, setError, setStatus} from "../../../app/appReducer";
import axios, {AxiosError} from "axios";
import {errorUtils} from "../../../common/utils/errorUtils";
import {fetchProfile} from "../../Profile/profileReducer";
import {registerAPI} from "../sign-up/signUp-api";
import {signUpAC} from "../sign-up/signUpReducer";

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
        await SignInAPI.login(data)
        dispatch(signInAC(true))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        errorUtils(err, dispatch)
    } finally {
        dispatch(setStatus('success'))
    }


    /*  dispatch(setStatus('loading'))
    SignInAPI.login(data).then(res => {
                if (!res.data.error) {
                    dispatch(signInAC(true))
                } else {
                    if (res.data.error) {
                        dispatch(setError(res.data.error))
                    }
                }
                if (!res.data.error) {
                    dispatch(signInAC(true))
                    dispatch(initializeAppTC())
                }
            })
          /!*  .catch(e => {
              if (axios.isAxiosError(e)) {
                const error = e.response ? e.response.data.error : e.message
                dispatch(setError(error))
              }
            })*!/
        .finally (() => {
        dispatch(setStatus('success'))
    })*/
        }
// types
export type SignInACType = ReturnType<typeof signInAC>