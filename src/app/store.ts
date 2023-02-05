import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {profileReducer} from "../features/Profile/profileReducer";
import thunk from "redux-thunk";
import {appReducer} from "./appReducer";
import {signUpReducer} from "../features/Auth/sign-up/signUp-reducer";

const rootReducers = combineReducers({profile: profileReducer, app: appReducer, signUp: signUpReducer})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducers>