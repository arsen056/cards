import React from 'react'

import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

import { selectForgotStatus } from '../selectors'

import s from './ForgotPassword.module.css'

import checkEmail from 'assets/check-email.svg'
import { Box } from 'common/components/box/Box'
import { SuperButton } from 'common/components/SuperButton'

export const CheckEmail = () => {
  const forgotStatus = useSelector(selectForgotStatus)

  if (!forgotStatus) {
    return <Navigate to="/forgot-password" />
  }

  return (
    <div className={s.wrapper}>
      <Box title={'Check email'}>
        <img src={checkEmail} alt="" />
        <p style={{ textAlign: 'center' }} className={s.description}>
          We’ve sent an Email with instructions to example@mail.com
        </p>
        <Link to={'/login'}>
          <SuperButton>Back to login</SuperButton>
        </Link>
      </Box>
    </div>
  )
}
