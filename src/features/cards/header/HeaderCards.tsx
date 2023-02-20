import React, { FC } from 'react'

import { CardModal } from '../../modal/cardModal/CardModal'
import { setCardQuestion } from '../cardsReducer'

import { CardMenu } from './cardMenu/cardMenu'
import style from './HeaderCards.module.css'

import { Search } from 'common/components/search/Search'
import s from 'features/packs/header/HeaderPacks.module.css'

type HeaderCardsPropsType = {
  title: string
  cardModalFunctional: (question: string, answer: string) => void
  packUserId: string
  userId: string
  packID: string
}

export const HeaderCards: FC<HeaderCardsPropsType> = ({
  cardModalFunctional,
  userId,
  packUserId,
  packID,
  title,
}) => {
  const isEdited = userId === packUserId

  const titleButton = userId === packUserId ? 'Add new card' : 'Learn to pack'

  return (
    <div>
      <div className={`${s.wrapper} ${style.headerCards}`}>
        <div className={style.titleAndButton}>
          <div className={style.menu}>
            <h2>{title}</h2>
            {isEdited && <CardMenu packID={packID} />}
          </div>
          <CardModal
            typeButton={'superButton'}
            titleButton={titleButton}
            cardModalFunctional={cardModalFunctional}
          />
        </div>

        <Search setNameAC={setCardQuestion} />
      </div>
    </div>
  )
}
