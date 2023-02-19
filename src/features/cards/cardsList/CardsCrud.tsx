import React from 'react'

import { IconButton } from '@mui/material'

import { deleteCardTC, updateCardTC } from '../cardsReducer'

import { AppDispatch } from 'app/store'
import deleteIcon from 'assets/delete.svg'
import editIcon from 'assets/edit.svg'

type CardsCrudType = {
  cardId: string
  packID: string
}

export const CardsCrud = ({ cardId, packID }: CardsCrudType) => {
  const dispatch = AppDispatch()
  const deleteCard = () => {
    dispatch(deleteCardTC(cardId, packID))
  }

  const updateCard = () => {
    dispatch(
      updateCardTC(
        { card: { _id: cardId, question: 'new question', answer: 'correct answer' } },
        packID
      )
    )
  }

  return (
    <div>
      <IconButton onClick={updateCard} size="small">
        <img src={editIcon} alt="edit icon" />
      </IconButton>
      <IconButton onClick={deleteCard} size="small">
        <img src={deleteIcon} alt="delete icon" />
      </IconButton>
    </div>
  )
}
