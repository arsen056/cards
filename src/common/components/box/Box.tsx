import React, {FC, HTMLAttributes} from 'react';
import s from './Box.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {AppStatusType} from "../../../app/appReducer";
import {Loader} from "../Loader/Loader";

type BoxPropsType = {
  title?: string
} & HTMLAttributes<HTMLDivElement>

export const Box: FC<BoxPropsType> = ({children, title}) => {

  const appStatus = useSelector<AppRootStateType, AppStatusType>(state => state.app.status)

  return (
    <div className={s.box}>
      {appStatus === 'loading'
        ? <div className={s.loader}><Loader/></div>
        : <>
          {title && <h2 className={s.title}>{title}</h2>}
          {children}
        </>
      }
    </div>
  )
};
