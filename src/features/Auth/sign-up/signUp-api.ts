import {instance} from "../../../API/instance";

export type RegisterParamsType = {
    email: string
    password: string
}

export const registerAPI = {
    registration(data: RegisterParamsType) {
        return instance.post('auth/register', data)
            .then(res => res.data)
    },
}