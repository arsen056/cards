import React from 'react';
import s from './Header.module.css'
import {Logo} from "./logo/Logo";
import {Avatar} from "./avatar/Avatar";

export const Header = () => {
  return (
    <header id='header' className={s.header}>
      <div className={`container ${s.headerFlex}`}>
        <Logo/>
        <Avatar/>
      </div>
    </header>
  );
};
