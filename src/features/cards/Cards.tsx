import React, { memo, useEffect } from 'react'

import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

import { selectIsLoggedIn, selectStatus } from '../../common/selectors'
import { selectUserID } from '../packs/selectors'

import { CardsList } from './cardsList/CardsList'
import { addCardTC, getCards, setCardsPage, setCardsPageCount } from './cardsReducer'
import { EmptyPack } from './header/emptyPack/EmptyPack'
import { HeaderCards } from './header/HeaderCards'
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

  const addCard = () => {
    dispatch(
      addCardTC({
        card: {
          cardsPack_id: packID as string,
          question: 'how do you like this task?',
          answer: 'It is wonderful',
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
        addCard={addCard}
        userId={userId}
        packUserId={packUserId}
        packID={packID ? packID : ''}
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
