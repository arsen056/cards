import {AppRootStateType} from "../../app/store";

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (!serializedState) return undefined;
    else return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
};

export const saveState = (state: AppRootStateType) => {
  try {
    const serializedState = JSON.stringify({packs: state.packs});
    localStorage.setItem('state', serializedState);
  } catch(err) {

  }
};