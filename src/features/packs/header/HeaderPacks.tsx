import React from 'react';
import {SearchPacks} from "../searchPack/SearchPacks";
import {MyOrAll} from "./MyAll";
import {RangeSlider} from "./RangeSlider";
import resetIcon from "../../../assets/reset.svg"
import s from './HeaderPacks.module.css'

export const HeaderPacks = () => {


  const resetHandler = () => {

  }

  return (
    <div className={s.wrapper}>
      <SearchPacks/>
      <MyOrAll/>
      <RangeSlider/>
      <img className={s.reset} src={resetIcon} alt="reset" onClick={resetHandler}/>
    </div>
  );
};
