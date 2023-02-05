import {registerAPI, RegisterParamsType} from "./signUp-api";
import {setError, setStatus} from "../../../app/appReducer";
import {AppThunk} from "../../../app/store";


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
    } catch (e: any) {
        dispatch(setError(e.response.data.error))
    } finally {
        dispatch(setStatus('success'))
    }
}

// types
type InitialStateType = typeof initialState
export type SignUpActionsType = ReturnType<typeof signUpAC>




