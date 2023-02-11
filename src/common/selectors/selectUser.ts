import {AppRootStateType} from "../../app/store";
import {ProfileType} from "../../features/auth/authAPI/authAPI";

export const selectUser = (state: AppRootStateType):ProfileType => state.profile