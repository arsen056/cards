import {LoginParamsType, SignInAPI} from "./SignInAPI";
import {AppThunk} from "../../../app/store";
import {setStatus} from "../../../app/appReducer";
import {AxiosError} from "axios";
import {errorUtils} from "../../../common/utils/errorUtils";

const initialState = {
    isLoggedIn: false
}
type initialStateType = typeof initialState

export const loginReducer2 = (state: initialStateType = initialState, action: SignInACType): initialStateType => {
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
export const loginTC = (data: LoginParamsType): AppThunk => async dispatch => {
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
}

// types
export type SignInACType = ReturnType<typeof signInAC>