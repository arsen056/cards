import React, {useState} from 'react';
import s from './Profile.module.css'
import avatar from '../../assets/avatar.png'
import {EditableSpan} from "./editableSpan/EditableSpan";

export const Profile = () => {
  const [name, setName] = useState<string>('Ivan')

  return (
    <div className={s.profileWrapper}>
      <div id='profile-container' className={s.profileContainer}>
        <h2 id='profile-title' className={s.title}>Personal Information</h2>
        <div id='profile-avatar' className={s.avatarWrapper}>
          <img src={avatar} alt="avatar"/>
        </div>

        <EditableSpan title={name} changeTitle={setName}/>

        <div id='email' className={s.email}>j&johnson@gmail.com</div>

        <button id='profile-logout-btn' className={s.btn}>Log out</button>
      </div>
    </div>
  );
};
