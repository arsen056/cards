import {instance} from "../../API/instance";
import {ProfileType} from "../auth/authAPI/authAPI";

export const ProfileAPI = {
  changeProfile (name: string, avatar: string) {
    return instance.put<ChangeProfileResponseType>('auth/me', {name, avatar})
  }
}

type ChangeProfileResponseType = {
  updatedUser: ProfileType;
  token: string;
  tokenDeathTime: number;
}