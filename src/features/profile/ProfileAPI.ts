import { ProfileType } from '../auth/authAPI'

import { instance } from 'common/instance/instance'

export const ProfileAPI = {
  changeProfile(name: string, avatar: string) {
    return instance.put<ChangeProfileResponseType>('auth/me', { name, avatar })
  },
}

type ChangeProfileResponseType = {
  updatedUser: ProfileType
  token: string
  tokenDeathTime: number
}
