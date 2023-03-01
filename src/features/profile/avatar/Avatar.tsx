import { FC, memo } from 'react'

import { Camera } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { AppDispatch } from '../../../app/store'

import s from './Avatar.module.css'

type ProfileAvatarProps = {
  withButton?: boolean
  size: number
}

export const ProfileAvatar: FC<ProfileAvatarProps> = memo(({ withButton, size }) => {
  const dispatch = AppDispatch()
  const avatar = useUserAvatar(size)

  const onChangeAvatarHandler = (file64: string) => {
    dispatch(changeUserDataTC({ avatar: file64 }))
  }

  return (
    <div className={s.avatarContainer}>
      {avatar}
      {withButton && (
        <IconButton component="label">
          <Camera />
          <input
            type="file"
            hidden
            onChange={e => onChangeImg(e, dispatch, onChangeAvatarHandler)}
            accept="image/png, image/jpeg"
          />
        </IconButton>
      )}
    </div>
  )
})
