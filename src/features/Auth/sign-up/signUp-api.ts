import axios from "axios";


export const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:7542/2.0/'
        : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

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