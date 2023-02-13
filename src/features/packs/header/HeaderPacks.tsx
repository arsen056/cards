import React from 'react';
import {SearchPacks} from "../searchPack/SearchPacks";
import {MyOrAll} from "./MyAll";
import {RangeSlider} from "./RangeSlider";
import resetIcon from "../../../assets/reset.svg"
import s from './HeaderPacks.module.css'
import {SuperButton} from "../../../common/components/SuperButton";
import {addPackTC} from "../packList/PackListReducer";
import {AppDispatch} from "../../../app/store";

export const HeaderPacks = () => {
    const dispatch = AppDispatch()

  const resetHandler = () => {

  }

    const addPack = () => {
        dispatch(addPackTC({ cardsPack: { name: 'HI', private: false } }))
    }


  return (
    <div className={s.wrapper}>
        <SuperButton onClick={addPack}>Add new pack</SuperButton>
      <SearchPacks/>
      <MyOrAll/>
      <RangeSlider/>
      <img className={s.reset} src={resetIcon} alt="reset" onClick={resetHandler}/>
    </div>
  );
};
