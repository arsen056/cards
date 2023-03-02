import React, { memo, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import {
  selectCardQuestion,
  selectCards,
  selectCardsPackName,
  selectCardsPage,
  selectCardsPageCount,
  selectCardsTotalCount,
  selectIsDeleted,
  selectPackUserId,
} from './selectors'

import { AppDispatch } from 'app/store'
import { BackToPacksList } from 'common/components/backToPacksList/BackToPacksList'
import { SuperPagination } from 'common/components/superPagination/SuperPagination'
import { PATHS } from 'common/routes/PATHS'
import { selectIsLoggedIn } from 'common/selectors'
import { CardsList } from 'features/cards/cardsList/CardsList'
import { addCardTC, getCards, setCardsPage, setCardsPageCount } from 'features/cards/cardsReducer'
import { EmptyPack } from 'features/cards/header/emptyPack/EmptyPack'
import { HeaderCards } from 'features/cards/header/HeaderCards'
import { selectUserID } from 'features/packs/selectors'

export const Cards = memo(() => {
  const dispatch = AppDispatch()
  const { packID } = useParams()
  const cards = useSelector(selectCards)
  const cardsPackName = useSelector(selectCardsPackName)
  const cardsTotalCountCards = useSelector(selectCardsTotalCount)
  const cardsPage = useSelector(selectCardsPage)
  const cardsPageCount = useSelector(selectCardsPageCount)
  const userId = useSelector(selectUserID)
  const packUserId = useSelector(selectPackUserId)
  const cardQuestion = useSelector(selectCardQuestion)
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    dispatch(getCards(packID))
  }, [cardsPage, cardsPageCount, cardQuestion])

  const onChangePagination = (pageCardsNumber: number, pageCardsCount: number) => {
    dispatch(setCardsPage(pageCardsNumber))
    dispatch(setCardsPageCount(pageCardsCount))
  }

  const addCard = (question: string, answer: string, questionImg: string, answerImg: string) => {
    dispatch(
      addCardTC({
        card: {
          cardsPack_id: packID as string,
          question,
          answer,
          questionImg,
          answerImg,
          grade: 0,
        },
      })
    )
  }

  const isDeleted = useSelector(selectIsDeleted)

  if (isDeleted) {
    return <Navigate to={PATHS.packs} />
  }

  if (!isLoggedIn) {
    return <Navigate to={PATHS.login} />
  }

  return (
    <div className={'container padding-vertical'}>
      <BackToPacksList />
      <HeaderCards
        title={cardsPackName}
        cardModalFunctional={addCard}
        userId={userId}
        packUserId={packUserId}
        packID={packID ? packID : ''}
        cardsLength={cards.length}
      />

      {cards.length ? (
        <>
          <CardsList
            cards={cards}
            userId={userId}
            packUserId={packUserId}
            packID={packID ? packID : ''}
          />
          <SuperPagination
            page={cardsPage}
            itemsCountForPage={cardsPageCount}
            totalCount={cardsTotalCountCards}
            onChange={onChangePagination}
          />
        </>
      ) : (
        <EmptyPack addCard={addCard} userId={userId} packUserId={packUserId} />
      )}
    </div>
  )
})
