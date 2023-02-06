import React from 'react';
import s from './Header.module.css'
import {Logo} from "./logo/Logo";
import {Avatar} from "./avatar/Avatar";
import {SuperButton} from "../SuperButton";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";

export const Header = () => {

  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)

  return (
    <header id='header' className={s.header}>
      <div className={`container ${s.headerFlex}`}>
        <Logo/>
        {isLoggedIn ? <Avatar/> : <SuperButton>Sign in</SuperButton>}
        {/* Кнопку можно застилизовать как на макете */}
      </div>
    </header>
  );
};


