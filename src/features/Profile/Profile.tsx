import React from 'react';
import s from './Profile.module.css'
import {EditableSpan} from "./editableSpan/EditableSpan";
import {Avatar} from "./avatar/Avatar";
import {SuperButton} from "../../common/components/SuperButton";
import {Navigate} from "react-router-dom";
import {changeProfile} from "./profileReducer";
import {useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {SkeletonCustom} from "../../common/components/Sceleton";
import {AppStatusType} from "../../app/appReducer";
import {Box} from "../../common/components/box/Box";
import {ProfileType} from "../Auth/sign-in/SignInAPI";

export const Profile = () => {
  const user = useSelector<AppRootStateType, ProfileType>(state => state.profile)
  const loading = useSelector<AppRootStateType, AppStatusType>(state => state.app.status)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)

  const dispatch = AppDispatch()

  const editNameHandler = (name: string) => {
    dispatch(changeProfile(name, ''))
  }

  if (!isLoggedIn) {
    return <Navigate to='/'/>
  }

  const back = () => {

  }

  return (
    <div className='container'>
      <button className={s.back} onClick={back}>Back to Packs List</button>

      <div className={s.profileWrapper}>
        {loading === 'loading' ? <SkeletonCustom/>
          : <Box title={'Personal Information'}>
            <Avatar/>
            <EditableSpan title={user.name} changeTitle={editNameHandler}/>
            <div id='email' className={s.email}>{user.email}</div>
            <SuperButton id='profile-logout-btn' xType={'logOut'}>Log out</SuperButton>
          </Box> }
      </div>
    </div>
  );
};
