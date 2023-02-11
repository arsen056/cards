import {AppRootStateType} from "../../app/store";
import {ProfileType} from "../../features/Auth/sign-in/SignInAPI";

export const selectUser = (state: AppRootStateType):ProfileType => state.profile