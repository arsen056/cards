import {instance} from "../../../API/instance";

export const ForgotAPI = {
  forgotPass(email: string) {
    const forgot = {
      email: email,
      from: 'test-front-admin <@>',
      message: '<div style="background-color: lime; padding: 15px">\n' +
        'password recovery link: \n' +
        '<a href=\'https://arsen056.github.io/cards/#/set-new-password/$token$\'>\n' +
        'link</a>\n' +
        '</div>'
    }
    return instance.post<ForgotResponseType>('/auth/forgot', forgot)
  }
}

type ForgotResponseType = {
  info: string;
  success: boolean;
  answer: boolean;
  html: boolean;
}
