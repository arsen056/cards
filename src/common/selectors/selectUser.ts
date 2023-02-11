import {AppRootStateType} from "../../app/store";
import {ProfileType} from "../../features/auth/signIn/SignInAPI";

export const selectUser = (state: AppRootStateType):ProfileType => state.profile