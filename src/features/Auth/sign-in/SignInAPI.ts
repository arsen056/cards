import {instance} from "../../../API/instance";

export const SignInAPI = {
  login(email: string, password: string, rememberMe: boolean) {
    return instance.post<ProfileType>('auth/login', {email, password, rememberMe})
  },

  me() {
    return instance.post<ProfileType>('auth/me')
  },
}

export type ProfileType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
  avatar?: string;
}