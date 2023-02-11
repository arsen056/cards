import {AppRootStateType} from "../../app/store";

export const selectIsLoggedIn = (state: AppRootStateType):boolean => state.app.isLoggedIn