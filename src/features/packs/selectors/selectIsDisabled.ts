import {AppRootStateType} from "../../../app/store";

export const selectIsDisabled = (state: AppRootStateType):boolean => state.packs.isDisabled