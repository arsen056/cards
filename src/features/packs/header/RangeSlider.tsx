import React, {useState} from 'react';
import {Slider} from "@mui/material";
import {AppDispatch} from "../../../app/store";
import {setMax, setMin} from "../packsReducer";
import s from './HeaderPacks.module.css'
import {useSelector} from "react-redux";
import {selectMaxCardsCount, selectMinCardsCount} from "../../../common/selectors/selectMinMax";

export const RangeSlider = () => {
  const dispatch = AppDispatch()
  const [value, setValue] = useState<number[]>([0, 20])
  const maxValue = useSelector(selectMaxCardsCount)
  const minValue = useSelector(selectMinCardsCount)


  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const onChangeCommittedHandler = () => {
    dispatch(setMin(value[0]))
    dispatch(setMax(value[1]))
  }

  return (
    <div className={s.slider}>
      <span className={s.value}>{value[0]}</span>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        onChangeCommitted={onChangeCommittedHandler}
        max={maxValue}
        min={minValue}
      />
      <span className={s.value}>{value[1]}</span>
    </div>
  );
};
