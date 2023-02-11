import {instance} from "../../../API/instance";

export const NewPasswordAPI = {
  newPass(password: string, resetPasswordToken: string) {
    return instance.post('/auth/set-new-password', {password, resetPasswordToken})
  }
}