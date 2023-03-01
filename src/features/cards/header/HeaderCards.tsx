import React, { FC } from 'react'

import { setCardQuestion } from '../cardsReducer'

import { CardMenu } from './cardMenu/cardMenu'
import style from './HeaderCards.module.css'

import { CardModal } from 'common/components/modals/cardModal/CardModal'
import { Search } from 'common/components/search/Search'
import s from 'features/packs/header/HeaderPacks.module.css'

type HeaderCardsPropsType = {
  title: string
  cardModalFunctional: (question: string, answer: string) => void
  packUserId: string
  userId: string
  packID: string
  cardsLength?: number
}

export const HeaderCards: FC<HeaderCardsPropsType> = ({
  cardModalFunctional,
  userId,
  packUserId,
  packID,
  title,
  cardsLength,
}) => {
  const isEdited = userId === packUserId

  const titleButton = userId === packUserId ? 'Add new card' : 'Learn to pack'

  return (
    <div>
      <div className={`${s.wrapper} ${style.headerCards}`}>
        <div className={style.titleAndButton}>
          <div className={style.menu}>
            <h2>{title}</h2>
            {isEdited && <CardMenu packID={packID} title={title} />}
          </div>
          <CardModal
            typeButton={'superButton'}
            titleButton={titleButton}
            cardModalFunctional={cardModalFunctional}
            packID={packID}
            cardsLength={cardsLength}
          />
        </div>

        <Search setNameAC={setCardQuestion} />
      </div>
    </div>
  )
}
