import React, { memo, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { setIsDeleted } from '../cards/cardsReducer'

import { HeaderPacks } from './header/HeaderPacks'
import { PackList } from './packList/PackList'
import { getPacks } from './packsReducer'
import {
  selectMax,
  selectMin,
  selectPackName,
  selectPacksUserID,
  selectPage,
  selectPageCount,
  selectSortPacks,
} from './selectors'

import { AppDispatch } from 'app/store'
import { selectIsLoggedIn } from 'common/selectors'

export const Packs = memo(() => {
  const dispatch = AppDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const userID = useSelector(selectPacksUserID)
  const min = useSelector(selectMin)
  const max = useSelector(selectMax)
  const packName = useSelector(selectPackName)
  const page = useSelector(selectPage)
  const pageCount = useSelector(selectPageCount)
  const sortPacks = useSelector(selectSortPacks)

  useEffect(() => {
    // const params = Object.fromEntries(searchParams)
    // dispatch(setPage(+params.page || 1))
    // dispatch(setPageCount(+params.pageCount || 8))
    dispatch(setIsDeleted(false))
  }, [])

  useEffect(() => {
    dispatch(getPacks())
  }, [packName, userID, min, max, pageCount, page, sortPacks])

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={'container padding-vertical'}>
      <HeaderPacks />
      <PackList />
    </div>
  )
})
