import React from 'react'

import { deleteCardTC, updateCardTC } from '../cardsReducer'

import { AppDispatch } from 'app/store'
import { CardModal } from 'common/components/modals/cardModal/CardModal'

type CardsCrudType = {
  cardId: string
  packID: string
  cardAnswer: string
  cardQuestion: string
  cardQuestionImage?: string
  cardAnswerImage?: string
}

export const CardsCrud = ({
  cardId,
  packID,
  cardQuestion,
  cardAnswer,
  cardQuestionImage,
  cardAnswerImage,
}: CardsCrudType) => {
  const dispatch = AppDispatch()
  const deleteCard = () => {
    dispatch(deleteCardTC(cardId, packID))
  }

  const updateCard = (question: string, answer: string, questionImg: string, answerImg: string) => {
    dispatch(
      updateCardTC({ card: { _id: cardId, question, answer, questionImg, answerImg } }, packID)
    )
  }

  return (
    <div>
      <div style={{ display: 'inline-block' }}>
        <CardModal
          typeButton={'editIcon'}
          cardModalFunctional={updateCard}
          answer={cardAnswer}
          question={cardQuestion}
          cardQuestionImage={cardQuestionImage}
          cardAnswerImage={cardAnswerImage}
        />
      </div>
      <div style={{ display: 'inline-block' }}>
        <CardModal
          typeButton={'deleteIcon'}
          cardModalFunctional={deleteCard}
          question={cardQuestion}
          cardQuestionImage={cardQuestionImage}
        />
      </div>
    </div>
  )
}
