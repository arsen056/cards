import React from 'react'

import avatar from '../../../assets/avatar.png'

import s from './Avatar.module.css'

export const Avatar = () => {
  return (
    <div id="profile-avatar" className={s.avatarWrapper}>
      <img src={avatar} alt="avatar" />
      <span className={s.editAvatar}></span>
    </div>
  )
}
