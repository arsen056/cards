import {instance} from "../../API/instance";


export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}

export type RegisterParamsType = {
  email: string
  password: string
}

type ForgotResponseType = {
  info: string;
  success: boolean;
  answer: boolean;
  html: boolean;
}

export const SignInAPI = {
  login(data: LoginParamsType) {
    return instance.post<ProfileType>('auth/login', data)
  },

  me() {
    return instance.post<ProfileType>('auth/me')
  },

  logout() {
    return instance.delete(`auth/me`, {})
  }
}

export const registerAPI = {
  registration(data: RegisterParamsType) {
    return instance.post('auth/register', data)
      .then(res => res.data)
  },
}

export const NewPasswordAPI = {
  newPass(password: string, resetPasswordToken: string) {
    return instance.post('/auth/set-new-password', {password, resetPasswordToken})
  }
}

export const ForgotAPI = {
  forgotPass(email: string) {
    const forgot = {
      email: email,
      from: 'test-front-admin <@>',
      message: '<div style="background-color: lime; padding: 15px">\n' +
        'password recovery link: \n' +
        '<a href=\'https://arsen056.github.io/cards/#/set-newPassword/$token$\'>\n' +
        'link</a>\n' +
        '</div>'
    }
    return instance.post<ForgotResponseType>('/auth/forgot', forgot)
  }
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