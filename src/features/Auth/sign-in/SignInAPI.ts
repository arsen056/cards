import {instance} from "../../../API/instance";

export const SignInAPI = {
  login(email: string, password: string, rememberMe: boolean) {
    return instance.post<ResponseUserType>('auth/login', {email, password, rememberMe})
  },

  me() {
    return instance.post<ResponseUserType>('auth/me')
  },
}

export type ResponseUserType = {
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
}