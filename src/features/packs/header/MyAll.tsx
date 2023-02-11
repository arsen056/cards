import React from 'react';
import {useSelector} from "react-redux";
import {selectUserID} from "../../../common/selectors";
import {AppDispatch} from "../../../app/store";
import {setUserId} from "../packsReducer";

export const MyOrAll = () => {
  const userID = useSelector(selectUserID)
  const dispatch = AppDispatch()
  const myPacksHandler = () => {
    dispatch(setUserId(userID))
  }
  const allPacksHandler = () => dispatch(setUserId(null))

  return (
    <div>
      <button onClick={myPacksHandler}>My</button>
      <button onClick={allPacksHandler}>All</button>
    </div>
  );
};
