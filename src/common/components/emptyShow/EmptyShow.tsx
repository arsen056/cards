import React, { FC } from 'react'

import s from './EmptyShow.module.css'

import emptyImg from 'assets/empty.webp'

type EmptyArrayPropsType = {
  message: string
}
export const EmptyShow: FC<EmptyArrayPropsType> = ({ message }) => {
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>{message}</h2>
      <img className={s.img} src={emptyImg} alt="" />
    </div>
  )
}
