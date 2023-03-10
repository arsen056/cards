import React, { useEffect, useState } from 'react'

import { Slider } from '@mui/material'
import { useSelector } from 'react-redux'

import { setMax, setMin } from '../../packsReducer'
import { selectMax, selectMaxCardsCount, selectMin, selectMinCardsCount } from '../../selectors'
import s from '../HeaderPacks.module.css'

import { AppDispatch } from 'app/store'

export const RangeSlider = () => {
  const dispatch = AppDispatch()

  const maxValue = useSelector(selectMaxCardsCount)
  const minValue = useSelector(selectMinCardsCount)
  const min = useSelector(selectMin)
  const max = useSelector(selectMax)

  const [value, setValue] = useState<number[]>([minValue, maxValue])

  const isDisabled = !maxValue

  useEffect(() => {
    if (!min && !max) {
      console.log('setValue')
      setValue([minValue, maxValue])

      return
    }
    setValue([min, max])
  }, [min, max, maxValue])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

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
        disabled={isDisabled}
      />
      <span className={s.value}>{value[1]}</span>
    </div>
  )
}
