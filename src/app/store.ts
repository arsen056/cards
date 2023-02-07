import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {ProfileActionsType, profileReducer} from "../features/Profile/profileReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType, appReducer} from "./appReducer";
import {useDispatch} from "react-redux";
import {SignUpActionsType, signUpReducer} from "../features/Auth/sign-up/signUpReducer";

const rootReducers = combineReducers({profile: profileReducer, app: appReducer, signUp: signUpReducer})

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, ProfileActionsType>
export const AppDispatch = () => useDispatch<AppDispatchType>()
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionsRootTypes>
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducers>

export type ActionsRootTypes = ProfileActionsType | AppActionsType | SignUpActionsType