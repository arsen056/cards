import React from 'react';
import s from './Profile.module.css'
import {EditableSpan} from "./editableSpan/EditableSpan";
import {Avatar} from "./avatar/Avatar";
import {SuperButton} from "../../common/components/SuperButton";
import {useNavigate} from "react-router-dom";
import {editName, ProfileStateType} from "./profileReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {SkeletonCustom} from "../../common/components/Sceleton";
import {AppStatusType} from "../../app/appReducer";

export const Profile = () => {
  const user = useSelector<AppRootStateType, ProfileStateType>(state => state.profile)
  const loading = useSelector<AppRootStateType, AppStatusType>(state => state.app.status)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const editNameHandler = (name: string) => {
    dispatch(editName(name))
  }

  // useEffect(() => {
  //   dispatch(fetchProfile())
  // }, [])

// isLoggedIn ? redirect to login

  const back = () => navigate(-1)

  return (
    <div className='container'>
      <button className={s.back} onClick={back}>Back to Packs List</button>

      <div className={s.profileWrapper}>
        {loading === 'loading' ? <SkeletonCustom/>
          : <div id='profile-container' className={s.profileContainer}>
            <h2 id='profile-title' className={s.title}>Personal Information</h2>
            <Avatar/>
            <EditableSpan title={user.name} changeTitle={editNameHandler}/>

            <div id='email' className={s.email}>{user.email}</div>

            <SuperButton id='profile-logout-btn' xType={'logOut'}>Log out</SuperButton>
          </div>}
      </div>
    </div>
  );
};
