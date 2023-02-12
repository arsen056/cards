import React from 'react';
import {SearchPacks} from "../searchPack/SearchPacks";
import {MyOrAll} from "./MyAll";
import {RangeSlider} from "./RangeSlider";
import s from './HeaderPacks.module.css'

export const HeaderPacks = () => {
  return (
    <div className={s.wrapper}>
      <SearchPacks/>
      <MyOrAll/>
      <RangeSlider/>
    </div>
  );
};
