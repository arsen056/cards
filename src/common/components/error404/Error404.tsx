import React from 'react'

import { Box } from '../box/Box'

import s from './Error404.module.css'

import emptyImg from 'assets/empty.webp'

export const Error404 = () => {
  return (
    <div className={s.wrapper}>
      <Box title={'Page not found'}>
        <img className={s.img} src={emptyImg} alt="" />
      </Box>
    </div>
  )
}
