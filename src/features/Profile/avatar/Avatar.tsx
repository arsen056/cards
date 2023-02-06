import React from 'react';
import s from "./Avatar.module.css";
import avatar from "../../../assets/avatar.png";

export const Avatar = () => {
  return (
    <div id='profile-avatar' className={s.avatarWrapper}>
      <img src={avatar} alt="avatar"/>
      <span className={s.editAvatar}></span>
    </div>
  );
};
