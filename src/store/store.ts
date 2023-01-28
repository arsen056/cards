import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {profileReducer} from "../reducers/profileReducer";
import thunk from "redux-thunk";
import {appReducer} from "../reducers/appReducer";

const rootReducers = combineReducers({profile: profileReducer, app: appReducer})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk))