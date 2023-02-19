import React from 'react';
import s from './Profile.module.css'
import {EditableSpan} from "./editableSpan/EditableSpan";
import {Avatar} from "./avatar/Avatar";
import {SuperButton} from "common/components/SuperButton";
import {changeProfile} from "./profileReducer";
import {useSelector} from "react-redux";
import {AppDispatch} from "app/store";
import {Navigate} from "react-router-dom";
import {SkeletonCustom} from "common/components/Sceleton";
import {Box} from "common/components/box/Box";
import {logoutTC} from "../auth/signIn/loginReducer";
import {selectIsLoggedIn, selectStatus, selectUser} from "common/selectors";
import {BackToPacksList} from "common/components/backToPacksList/BackToPacksList";

export const Profile = () => {
  const user = useSelector(selectUser)
  const appStatus = useSelector(selectStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const dispatch = AppDispatch()

  const editNameHandler = (name: string) => {
    dispatch(changeProfile(name, ''))
  }

  if (!isLoggedIn) {
    return <Navigate to={'/login'}/>
  }

  const logOut = () => {
    dispatch(logoutTC())
  }

  return (
    <div className='container'>
      <BackToPacksList/>
      <div className={s.profileWrapper}>
        {appStatus === 'loading' ? <SkeletonCustom/>
          : <Box title={'Personal Information'}>
            <Avatar/>
            <EditableSpan title={user.name} changeTitle={editNameHandler}/>
            <div id='email' className={s.email}>{user.email}</div>
            <SuperButton id='profile-logout-btn' xType={'logOut'} onClick={logOut}>Log out</SuperButton>
          </Box>}
      </div>
    </div>
  );
};
