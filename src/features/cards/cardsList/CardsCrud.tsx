import React from 'react'

import { CardModal } from 'common/components/modals/cardModal/CardModal'
import { deleteCardTC, updateCardTC } from '../cardsReducer'

import { AppDispatch } from 'app/store'

type CardsCrudType = {
  cardId: string
  packID: string
  cardAnswer: string
  cardQuestion: string
}

export const CardsCrud = ({ cardId, packID, cardQuestion, cardAnswer }: CardsCrudType) => {
  const dispatch = AppDispatch()
  const deleteCard = () => {
    dispatch(deleteCardTC(cardId, packID))
  }

  const updateCard = (question: string, answer: string) => {
    dispatch(updateCardTC({ card: { _id: cardId, question, answer } }, packID))
  }

  return (
    <div>
      <div style={{ display: 'inline-block' }}>
        <CardModal
          typeButton={'editIcon'}
          cardModalFunctional={updateCard}
          answer={cardAnswer}
          question={cardQuestion}
        />
      </div>
      <div style={{ display: 'inline-block' }}>
        <CardModal
          typeButton={'deleteIcon'}
          cardModalFunctional={deleteCard}
          question={cardQuestion}
        />
      </div>
    </div>
  )
}
