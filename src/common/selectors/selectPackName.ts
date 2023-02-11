import {AppRootStateType} from "../../app/store";

export const selectPackName = (state: AppRootStateType): string | null => state.packs.packName