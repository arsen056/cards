import React, {memo, useEffect} from 'react';
import {PackList} from "./packList/PackList";
import {HeaderPacks} from "./header/HeaderPacks";
import {SuperPagination} from "../../common/components/superPagination/SuperPagination";
import {useSelector} from "react-redux";
import {selectCardPacksTotaCount, selectPage, selectPageCount} from "./selectors";
import {AppDispatch} from "../../app/store";
import {setPage, setPageCount} from "./packsReducer";
import {Navigate, useSearchParams} from "react-router-dom";
import {selectIsLoggedIn} from "../../common/selectors";
import {setIsDeleted} from "../cards/cardsReducer";

export const Packs = memo(() => {
  const dispatch = AppDispatch();
  const [searchParams, setSearchParams] = useSearchParams()

  const totalCount = useSelector(selectCardPacksTotaCount)
  const page = useSelector(selectPage)
  const pageCount = useSelector(selectPageCount)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  const onChangePagination = (pageNumber: number, pageCount: number) => {
    dispatch(setPage(pageNumber));
    dispatch(setPageCount(pageCount))
    setSearchParams({page: `${pageNumber}`, pageCount: `${pageCount}`})
  }

  useEffect(() => {
    // const params = Object.fromEntries(searchParams)
    // dispatch(setPage(+params.page || 1))
    // dispatch(setPageCount(+params.pageCount || 8))
    dispatch(setIsDeleted(false))
  }, [])


  if (!isLoggedIn) {
    return <Navigate to={'/login'}/>
  }

  return (
    <div className={'container padding-vertical'}>
      <HeaderPacks/>
      <PackList/>
      <SuperPagination page={page} itemsCountForPage={pageCount} totalCount={totalCount} onChange={onChangePagination}/>
    </div>
  );
});
