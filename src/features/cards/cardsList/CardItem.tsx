import React from 'react'

import { Rating } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { CardType } from '../CardsAPI'

import { CardsCrud } from './CardsCrud'

import ImageNotAvailable from 'assets/ImageNotAvailable.png'
import { Picture } from 'common/components/picture/Picture'
import { isoToDate } from 'common/utils/time'

type CardItemPropsType = {
  card: CardType
  packID: string
  userId: string
  packUserId: string
}

export const CardItem = ({ card, packID, userId, packUserId }: CardItemPropsType) => {
  const time = isoToDate(card.updated)

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {card.questionImg ? (
          <div style={{ display: 'inline-block' }}>
            <Picture deckCover={card.questionImg} defaultCover={ImageNotAvailable} />
          </div>
        ) : (
          <p>{card.question}</p>
        )}
      </TableCell>
      <TableCell align="center">
        {card.answerImg ? (
          <div style={{ display: 'inline-block' }}>
            <Picture deckCover={card.answerImg} defaultCover={ImageNotAvailable} />
          </div>
        ) : (
          <p>{card.answer}</p>
        )}
      </TableCell>
      <TableCell align="right">{time}</TableCell>
      <TableCell align="right">
        <Rating name="read-only" value={card.grade} readOnly />
      </TableCell>
      {userId === packUserId && (
        <TableCell align="right">
          <CardsCrud
            cardId={card._id}
            packID={packID}
            cardAnswer={card.answer}
            cardQuestion={card.question}
            cardQuestionImage={card.questionImg}
            cardAnswerImage={card.answerImg}
          />
        </TableCell>
      )}
    </TableRow>
  )
}
