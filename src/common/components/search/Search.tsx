import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'

import { AppDispatch } from 'app/store'
import { useDebounce } from 'common/hooks/useDebounce'
import { setCardQuestion } from 'features/cards/cardsReducer'
import { setPackName } from 'features/packs/packsReducer'

type SearchPropsType = {
  setNameAC: (value: string) => ReturnType<typeof setPackName> | ReturnType<typeof setCardQuestion>
  searchParams?: string
}

export const Search: FC<SearchPropsType> = ({ setNameAC, searchParams }) => {
  const [value, setValue] = useState<string>(searchParams || '')
  const debouncedValue = useDebounce<string>(value, 1000)
  const dispatch = AppDispatch()

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    dispatch(setNameAC(value))
  }, [debouncedValue])

  useEffect(() => {
    if (searchParams !== undefined) {
      setValue(searchParams)
    }
  }, [searchParams])

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Provide your text"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={value}
        onChange={onChangeHandler}
      />
      <SearchIcon />
    </Paper>
  )
}
