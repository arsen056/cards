import React from 'react'

import { IconButton } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { UpdatePackType } from '../PacksAPI'
import { selectUserID } from '../selectors'

import s from './packList.module.css'

import { AppDispatch } from 'app/store'
import educationIcon from 'assets/learn.svg'
import { PackModal } from 'common/components/modals/packModal/PackModal'
import { setCardsCards, setCardsPageCount } from 'features/cards/cardsReducer'

export const PackListCrud: React.FC<ActionButtonsContainerType> = ({
  id,
  userId,
  cardsCount,
  educationsAction,
  editAction,
  deleteAction,
  packName,
  deckCover,
}) => {
  const userProfileID = useSelector(selectUserID)

  const deleteCallback = () => {
    deleteAction && deleteAction(id)
  }

  const editCallback = (packName: string, statusPrivate: boolean, deckCover: string) => {
    editAction &&
      editAction({ cardsPack: { _id: id, name: packName, private: statusPrivate, deckCover } })
  }

  const dispatch = AppDispatch()

  const learnPack = () => {
    dispatch(setCardsPageCount(cardsCount))
    dispatch(setCardsCards([]))
  }

  return (
    <div>
      {educationsAction && (
        <IconButton
          size="small"
          disabled={cardsCount === 0}
          className={cardsCount === 0 ? s.disabled : s.button}
          onClick={learnPack}
        >
          <Link to={`/learn/${id}`}>
            <img src={educationIcon} alt="education icon" />
          </Link>
        </IconButton>
      )}

      {userId === userProfileID && editAction && (
        <div style={{ display: 'inline-block' }}>
          <PackModal
            packModalFunctional={editCallback}
            typeButton={'editIcon'}
            nameValue={packName}
            coverPack={deckCover}
          />
        </div>
      )}

      {userId === userProfileID && editAction && (
        <div style={{ display: 'inline-block' }}>
          <PackModal
            packModalFunctional={deleteCallback}
            typeButton={'deleteIcon'}
            nameValue={packName}
          />
        </div>
      )}
    </div>
  )
}

export type ActionButtonsContainerType = {
  id: string
  userId: string
  educationsAction?: (id: string) => void
  editAction?: (data: UpdatePackType) => void
  deleteAction?: (id: string) => void
  cardsCount: number
  packName: string
  deckCover: string
}
