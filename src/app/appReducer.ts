const initState: AppStateType = {
  status: 'idle',
  isLoggedIn: false
}

export type AppStateType = {
  status: AppStatusType,
  isLoggedIn: boolean
}

export type AppStatusType = 'idle' | 'loading' | 'error' | 'success'

export const appReducer = (state=initState, action: AppActionsType) => {
  switch (action.type) {
    default:
      return state
  }
}

export type AppActionsType = any