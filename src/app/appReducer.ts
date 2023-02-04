const initState = {status: 'idle'}

export const appReducer = (state=initState, action: AppActionsType) => {
  switch (action.type) {
    default:
      return state
  }
}

export type AppActionsType = any