import {setStatus} from "../../../app/appReducer";
import {AppThunk} from "../../../app/store";
import {errorUtils} from "../../../common/utils/errorUtils";
import {AxiosError} from "axios";
import {registerAPI, RegisterParamsType} from "../authAPI/authAPI";


const initialState = {
    signUp: false
}

export const signUpReducer = (state: InitialStateType = initialState, action: SignUpActionsType): InitialStateType => {
    switch (action.type) {
        case 'SIGNUP/REGISTER':
            return {...state, signUp: action.value}
        default:
            return state
    }
}

// actions
export const signUpAC = (value: boolean) => ({type: 'SIGNUP/REGISTER', value} as const)

// thunks
export const signUpTC = (data: RegisterParamsType): AppThunk => async dispatch => {
    dispatch(setStatus('loading'))
    try {
        await registerAPI.registration(data)
        dispatch(signUpAC(true))
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        errorUtils(err, dispatch)
    } finally {
        dispatch(setStatus('success'))
    }
}

// types
type InitialStateType = typeof initialState
export type SignUpActionsType = ReturnType<typeof signUpAC>




