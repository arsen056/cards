import React from 'react';
import {Slider} from "@mui/material";
import {AppDispatch} from "../../../app/store";
import {setMax, setMin} from "../packsReducer";
import s from './HeaderPacks.module.css'

export const RangeSlider = () => {
  const [value, setValue] = React.useState<number[]>([0, 20]);
  const dispatch = AppDispatch()

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const onChangeCommittedHandler = () => {
    dispatch(setMin(value[0]))
    dispatch(setMax(value[1]))
  }

  return (
    <div className={s.slider}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        onChangeCommitted={onChangeCommittedHandler}
      />
    </div>
  );
};
