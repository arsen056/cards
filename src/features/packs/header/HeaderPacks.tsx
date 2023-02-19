import React from 'react';
import {MyOrAll} from "./myAllBtn/MyAll";
import {RangeSlider} from "./rangeSlider/RangeSlider";
import resetIcon from "assets/reset.svg"
import s from './HeaderPacks.module.css'
import {SuperButton} from "common/components/SuperButton";
import {AppDispatch} from "app/store";
import {addPackTC, setPackName, setResetFilters} from "../packsReducer";
import {useSelector} from "react-redux";

import {Search} from "common/components/search/Search";
import {searchParamsSelector, selectMaxCardsCount} from "../selectors";

export const HeaderPacks = () => {
  const dispatch = AppDispatch()

  const searchParams = useSelector(searchParamsSelector)
  const maxValue = useSelector(selectMaxCardsCount)

  const resetHandler = () => {
    dispatch(setResetFilters(maxValue))
  }

  const addPack = () => {
    dispatch(addPackTC({cardsPack: {name: 'TEST PACK', private: false}}))
  }

  return (
    <div className={s.headerPacks}>
      <div className={s.headTitleButton}>
        <h2>Packs List</h2>
        <SuperButton onClick={addPack}>Add new pack</SuperButton>
      </div>
      <div className={s.wrapper}>

        <Search searchParams={searchParams} setNameAC={setPackName}/>
        <MyOrAll/>
        <RangeSlider/>
        <img className={s.reset} src={resetIcon} alt="reset" onClick={resetHandler}/>
      </div>
    </div>
  );
};
