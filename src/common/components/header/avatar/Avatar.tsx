import React from 'react';
import s from './Avatar.module.css'
import avatar from '../../../../assets/avatar.png'

export const Avatar = () => {
  return (
    <div className={s.avatarWrapper}>
      <span className={s.name}>Ivan</span>
      <div id='avatar' className={s.avatar}>
        <img src={avatar} alt="avatar"/>
      </div>
    </div>

  );
};
