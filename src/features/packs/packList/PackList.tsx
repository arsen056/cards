import React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useSelector } from 'react-redux'

import { AppDispatch } from '../../../app/store'
import { EmptyArray } from '../../../common/components/emptyArray/EmptyArray'
import { SuperPagination } from '../../../common/components/superPagination/SuperPagination'
import { setPage, setPageCount } from '../packsReducer'
import {
  selectCardPacks,
  selectCardPacksTotaCount,
  selectPackName,
  selectPage,
  selectPageCount,
} from '../selectors'

import { PackItem } from './PackItem'
import s from './packList.module.css'

export const PackList = () => {
  const dispatch = AppDispatch()

  const packs = useSelector(selectCardPacks)
  const totalCount = useSelector(selectCardPacksTotaCount)
  const page = useSelector(selectPage)
  const pageCount = useSelector(selectPageCount)
  const packName = useSelector(selectPackName)

  const onChangePagination = (pageNumber: number, pageCount: number) => {
    dispatch(setPage(pageNumber))
    dispatch(setPageCount(pageCount))
  }

  if (!packName && !packs.length) {
    return <EmptyArray message={'Pack list empty'} />
  }

  if (packName && !packs.length) {
    return <EmptyArray message={'Check your query'} />
  }

  return (
    <>
      <TableContainer className={s.tableContainer} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className={s.thead}>
              <TableCell>Name</TableCell>
              <TableCell align="right">Cards</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Created by</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {packs.map(pack => (
              <PackItem key={pack._id} pack={pack} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SuperPagination
        page={page}
        itemsCountForPage={pageCount}
        totalCount={totalCount}
        onChange={onChangePagination}
      />
    </>
  )
}
