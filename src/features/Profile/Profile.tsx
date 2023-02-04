import React from 'react';
import s from './Profile.module.css'
import avatar from '../../assets/avatar.png'

export const Profile = () => {
  return (
    <div className={s.profileWrapper}>
      <div id='profile-container' className={s.profileContainer}>
        <h2 id='profile-title' className={s.title}>Personal Information</h2>
        <div id='profile-avatar' className={s.avatarWrapper}>
          <img src={avatar} alt="avatar"/>
        </div>

        <h3 id='nickname' className={s.name}>
          Ivan
          <img src="" alt=""/>
        </h3>

        <div id='email' className={s.email}>j&johnson@gmail.com</div>

        <button id='profile-logout-btn' className={s.btn}>Log out</button>
      </div>
    </div>
  );
};
