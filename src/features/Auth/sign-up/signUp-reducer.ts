

const initialState = {
    signUp : false
}
type InitialStateType = typeof initialState

export const signUpReducer = (state: InitialStateType  = initialState, action: signUpActionsType): InitialStateType => {
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
// export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
//     dispatch(setAppStatusAC('loading'))
//     authApi.login(data)
//         .then((res) => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedInAC(true))
//                 dispatch(setAppStatusAC('succeeded'))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }})
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }

// export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
//     dispatch(setAppStatusAC('loading'))
//     authApi.logout()
//         .then((res) => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedInAC(false))
//                 dispatch(setAppStatusAC('succeeded'))
//                 dispatch(clearTodolistsAC())
//             } else {
//                 handleServerAppError(res.data, dispatch)
//             }})
//         .catch((error) => {
//             handleServerNetworkError(error, dispatch)
//         })
// }



// types
type signUpActionsType = ReturnType<typeof signUpAC>



