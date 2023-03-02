import React, { FC, useState } from 'react'

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { Link } from 'react-router-dom'

import { AppDispatch } from 'app/store'
import defaultCover from 'assets/defaultCoverPack.png'
import { isoToDate } from 'common/utils/time'
import s from 'features/packs/packList/packItem/PackItem.module.css'
import { PackListCrud } from 'features/packs/packList/PackListCRUD'
import { PackType, UpdatePackType } from 'features/packs/PacksAPI'
import { deletePackTC, updatePackTC } from 'features/packs/packsReducer'

type PackItemPropsType = {
  pack: PackType
}

export const PackItem: FC<PackItemPropsType> = ({ pack }) => {
  const dispatch = AppDispatch()

  const [cover, setCover] = useState<string>(pack.deckCover)

  const updatePack = (data: UpdatePackType) => {
    dispatch(updatePackTC(data))
  }

  const deletePack = (id: string) => {
    dispatch(deletePackTC(id))
  }

  const errorPicture = () => setCover(defaultCover)

  const date = isoToDate(pack.updated)

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Link to={pack._id}>{pack.name}</Link>
      </TableCell>
      <TableCell align="right">
        <div className={s.packCoverWrapper}>
          <img src={cover ? cover : defaultCover} alt="pack cover" onError={errorPicture} />
        </div>
      </TableCell>
      <TableCell align="right">{pack.cardsCount}</TableCell>
      <TableCell align="right">{date}</TableCell>
      <TableCell align="right">{pack.user_name}</TableCell>
      <TableCell align="right">
        <PackListCrud
          id={pack._id}
          cardsCount={pack.cardsCount}
          userId={pack.user_id}
          educationsAction={() => {}}
          packName={pack.name}
          editAction={updatePack}
          deleteAction={deletePack}
        />
      </TableCell>
    </TableRow>
  )
}
