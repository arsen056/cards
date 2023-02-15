import React, {ChangeEvent, useEffect, useState} from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {useDebounce} from "../../../common/hooks/useDebounce";
import {setPackName} from "../packsReducer";
import {AppDispatch} from "../../../app/store";


export const SearchPacks = () => {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 1000)
  const dispatch = AppDispatch()

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useEffect(() => {
    dispatch(setPackName(value))
  }, [debouncedValue])

  useEffect(() => {

  }, [value])


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
  );
}