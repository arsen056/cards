import React, {FC, HTMLAttributes} from 'react';
import s from './Box.module.css'
import {useSelector} from "react-redux";
import {Loader} from "../loader/Loader";
import {selectStatus} from "../../selectors";


type BoxPropsType = {
  title?: string
} & HTMLAttributes<HTMLDivElement>

export const Box: FC<BoxPropsType> = ({children, title}) => {

  const appStatus = useSelector(selectStatus)

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
