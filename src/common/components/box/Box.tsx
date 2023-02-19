import React, { FC, HTMLAttributes } from 'react'

import s from './Box.module.css'

type BoxPropsType = {
  title?: string
} & HTMLAttributes<HTMLDivElement>

export const Box: FC<BoxPropsType> = ({ children, title }) => {
  return (
    <div className={s.box}>
      {title && <h2 className={s.title}>{title}</h2>}
      {children}
    </div>
  )
}
