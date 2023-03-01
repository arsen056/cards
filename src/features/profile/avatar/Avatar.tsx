import React, { ChangeEvent, memo, useEffect, useRef, useState } from 'react'

import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import { Avatar, Fab } from '@mui/material'
import { useSelector } from 'react-redux'

import { setError } from '../../../app/appReducer'
import { AppDispatch } from '../../../app/store'
import avatarImg from '../../../assets/avatar.png'
import { convertFileToBase64 } from '../../../common/utils/convertFileToBase64'
import { ProfileType } from '../../auth/authAPI'
import { selectAvatarFromState } from '../../auth/selectors'
import { changeProfile } from '../profileReducer'

import s from './Avatar.module.css'

export const AvatarComponent = memo(({ user }: AvatarComponentType) => {
  const avatarFromState = useSelector(selectAvatarFromState)
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = AppDispatch()
  const [avatar, setAvatar] = useState<string>(avatarFromState as string)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  //
  useEffect(() => {
    if (avatarFromState) {
      dispatch(changeProfile('', avatar))
    }
  }, [avatar])

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      const fileSizeMB = file.size / 1024 ** 2

      if (fileSizeMB < 1) {
        convertFileToBase64(file, setAvatar)
      } else {
        dispatch(setError('Файл слишком большого размера'))
      }
    }
  }

  return (
    <div className={s.avatarContainer}>
      <Avatar
        alt="avatar"
        src={user.avatar ? user.avatar : avatarImg}
        sx={{ width: 96, height: 96, left: 17 }}
      />
      <input
        type="file"
        name="myImage"
        accept="image/*"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={uploadHandler}
      />
      <Fab size={'small'} sx={{ left: '-17px' }} onClick={selectFileHandler}>
        <PhotoCameraOutlinedIcon fontSize={'small'} />
      </Fab>
    </div>
  )
})

type AvatarComponentType = {
  user: ProfileType
}
