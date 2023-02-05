import React, {useState} from 'react';
import s from './Profile.module.css'
import {EditableSpan} from "./editableSpan/EditableSpan";
import {Avatar} from "./avatar/Avatar";
import {SuperButton} from "../../common/components/SuperButton";
import {useNavigate} from "react-router-dom";

export const Profile = () => {
  const [name, setName] = useState<string>('Ivan')

  const navigate = useNavigate();

  const back = () => navigate(-1)

  return (
    <div className='container'>
      <button className={s.back} onClick={back}>Back to Packs List</button>
      <div className={s.profileWrapper}>
        <div id='profile-container' className={s.profileContainer}>
          <h2 id='profile-title' className={s.title}>Personal Information</h2>
          <Avatar/>
          <EditableSpan title={name} changeTitle={setName}/>

          <div id='email' className={s.email}>j&johnson@gmail.com</div>

          {/*<button id='profile-logout-btn' className={s.btn}>Log out</button>*/}
          <SuperButton id='profile-logout-btn' xType={'logOut'}>Log out</SuperButton>
        </div>
      </div>
    </div>
  );
};
