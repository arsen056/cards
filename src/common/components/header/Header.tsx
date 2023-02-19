import React from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { SuperButton } from '../SuperButton'

import { Avatar } from './avatar/Avatar'
import s from './Header.module.css'
import { Logo } from './logo/Logo'

import { selectIsLoggedIn } from 'common/selectors'

export const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <header id="header" className={s.header}>
      <div className={`container ${s.headerFlex}`}>
        <Link to={'/'}>
          <Logo />
        </Link>
        {isLoggedIn ? (
          <Avatar />
        ) : (
          <Link to={'/login'}>
            <SuperButton>Sign in</SuperButton>
          </Link>
        )}
      </div>
    </header>
  )
}
