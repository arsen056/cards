import {instance} from "../../../API/instance";

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}

export const SignInAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseUserType>('auth/login', data)
  },

  me() {
    return instance.post<ResponseUserType>('auth/me')
  },
  logout() {
    return instance.delete(`auth/me`, {})
  }
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
  error?: string
}