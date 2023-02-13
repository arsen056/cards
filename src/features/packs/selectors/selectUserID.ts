import {AppRootStateType} from "../../../app/store";

export const selectUserID = (state: AppRootStateType) => state.profile._id
export const selectPacksUserID = (state: AppRootStateType) => state.packs.user_id