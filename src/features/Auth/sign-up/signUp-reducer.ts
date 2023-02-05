import {Dispatch} from "redux";
import {registerAPI, RegisterParamsType} from "./signUp-api";



const initialState = {
    // status: 'loading' as RequestStatusType,
    signUp : false
}

export const signUpReducer = (state: InitialStateType  = initialState, action: SignUpActionsType): InitialStateType => {
    switch (action.type) {
        case 'REGISTRATION':
            return {...state, signUp: action.value}
        default:
            return state
    }
}

// actions
export const signUpAC = (value: boolean) =>
    ({type: 'REGISTRATION', value} as const)

// thunks
export const signUpTC = (data: RegisterParamsType) => (dispatch: Dispatch) => {
    // dispatch(setAppStatusAC('loading'))
    registerAPI.registration(data)
        .then((res) => {
                console.log(res)
            dispatch(signUpAC(true))
                // dispatch(setIsLoggedInAC(true))
                // dispatch(setAppStatusAC('succeeded'))
                // dispatch(setAppStatusAC('succeeded'))
            })
        .catch((error) => {
          console.log(error)
        })
}

// types
type InitialStateType = typeof initialState
type SignUpActionsType = ReturnType<typeof signUpAC>




