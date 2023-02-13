import React from 'react';
import {PackList} from "./packList/PackList";
import {HeaderPacks} from "./header/HeaderPacks";
import {SuperPagination} from "../../common/components/superPagination/SuperPagination";
import {useSelector} from "react-redux";
import {selectCardPacksTotaCount, selectPage, selectPageCount} from "../../common/selectors";
import {AppDispatch} from "../../app/store";
import {setPage, setPageCount} from "./packsReducer";

export const Packs = () => {
  const dispatch = AppDispatch();

  const totalCount = useSelector(selectCardPacksTotaCount)
  const page = useSelector(selectPage)
  const pageCount = useSelector(selectPageCount)

  const onChangePagination = (pageNumber: number, pageCount: number) => {
    dispatch(setPage(pageNumber))
    dispatch(setPageCount(pageCount))
  }

  return (
    <div className={'container pading-vertical'}>
      <HeaderPacks/>
      <PackList/>
      <SuperPagination page={page} itemsCountForPage={pageCount} totalCount={totalCount} onChange={onChangePagination}/>
    </div>
  );
};
