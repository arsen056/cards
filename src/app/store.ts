import { useDispatch } from 'react-redux'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AppActionsType, appReducer } from './appReducer'

import { loadState, saveState } from 'common/utils/localStorage'
import { ForgotActionType, forgotReducer } from 'features/auth/forgotPassword/forgotReducer'
import { loginReducer, SignInACType } from 'features/auth/signIn/loginReducer'
import { SignUpActionsType, signUpReducer } from 'features/auth/signUp/signUpReducer'
import { CardsActionsType, cardsReducer } from 'features/cards/cardsReducer'
import { PacksActionsType, packsReducer } from 'features/packs/packsReducer'
import { ProfileActionsType, profileReducer } from 'features/profile/profileReducer'

const rootReducers = combineReducers({
  profile: profileReducer,
  app: appReducer,
  login: loginReducer,
  signUp: signUpReducer,
  forgot: forgotReducer,
  packs: packsReducer,
  cards: cardsReducer,
})

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, ActionsRootTypes>
export const AppDispatch = () => useDispatch<AppDispatchType>()
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  ActionsRootTypes
>

const persistedState = loadState()

export const store = legacy_createStore(rootReducers, persistedState, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducers>
export type ActionsRootTypes =
  | ProfileActionsType
  | AppActionsType
  | SignUpActionsType
  | SignInACType
  | ForgotActionType
  | PacksActionsType
  | CardsActionsType

store.subscribe(() => {
  saveState(store.getState())
})
