import React, {memo, useEffect} from 'react';
import {PackList} from "./packList/PackList";
import {HeaderPacks} from "./header/HeaderPacks";
import {useSelector} from "react-redux";
import {
  selectMax,
  selectMin,
  selectPackName,
  selectPacksUserID,
  selectPage,
  selectPageCount
} from "./selectors";
import {AppDispatch} from "app/store";
import {getPacks} from "./packsReducer";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "common/selectors";
import {setIsDeleted} from "../cards/cardsReducer";

export const Packs = memo(() => {
  const dispatch = AppDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const userID = useSelector(selectPacksUserID)
  const min = useSelector(selectMin)
  const max = useSelector(selectMax)
  const packName = useSelector(selectPackName)
  const page = useSelector(selectPage)
  const pageCount = useSelector(selectPageCount)

  useEffect(() => {
    // const params = Object.fromEntries(searchParams)
    // dispatch(setPage(+params.page || 1))
    // dispatch(setPageCount(+params.pageCount || 8))
    dispatch(setIsDeleted(false))
  }, [])

  useEffect(() => {
    dispatch(getPacks())
  }, [packName, userID, min, max, pageCount, page])

  if (!isLoggedIn) {
    return <Navigate to={'/login'}/>
  }

  return (
    <div className={'container padding-vertical'}>
      <HeaderPacks/>
      <PackList/>
    </div>
  );
});
