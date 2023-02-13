import React from 'react';
import {SearchPacks} from "../searchPack/SearchPacks";
import {MyOrAll} from "./MyAll";
import {RangeSlider} from "./RangeSlider";
import resetIcon from "../../../assets/reset.svg"
import s from './HeaderPacks.module.css'
import {SuperButton} from "../../../common/components/SuperButton";
import {addPackTC} from "../packList/PackListReducer";
import {AppDispatch} from "../../../app/store";


// type HeaderPacksPropsType = {
//   searchParams: URLSearchParams
//   setSearchParams: (value: URLSearchParams) => void
// }

export const HeaderPacks = () => {
  const dispatch = AppDispatch()

  const resetHandler = () => {

  }

  const addPack = () => {
    dispatch(addPackTC({cardsPack: {name: 'TEST PACK', private: false}}))
  }


  return (
    <div>
      <div className={s.headTitleButton}>
        <h2>Packs List</h2>
        <SuperButton onClick={addPack}>Add new pack</SuperButton>
      </div>
      <div className={s.wrapper}>

        <SearchPacks/>
        <MyOrAll/>
        <RangeSlider/>
        <img className={s.reset} src={resetIcon} alt="reset" onClick={resetHandler}/>
      </div>

    </div>
  );
};
