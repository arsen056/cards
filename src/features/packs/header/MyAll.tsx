import React from 'react';
import {useSelector} from "react-redux";
import {selectUserID} from "../selectors";
import {AppDispatch} from "../../../app/store";
import {setUserId} from "../packsReducer";
import {SuperButton} from "../../../common/components/SuperButton";

export const MyOrAll = () => {
  const userID = useSelector(selectUserID)
  const dispatch = AppDispatch()
  const myPacksHandler = () => {
    dispatch(setUserId(userID))
  }
  const allPacksHandler = () => dispatch(setUserId(null))

  return (
    <div>
      <SuperButton onClick={myPacksHandler}>My</SuperButton>
      <SuperButton onClick={allPacksHandler}>All</SuperButton>
    </div>
  );
};
