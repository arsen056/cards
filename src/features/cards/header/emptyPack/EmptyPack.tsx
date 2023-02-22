import React from 'react'

import s from './EmptyPack.module.css'

import { CardModal } from 'features/modal/cardModal/CardModal'

type EmptyPackPropsType = {
  addCard: (question: string, answer: string) => void
  userId: string
  packUserId: string
}

export const EmptyPack = ({ addCard, userId, packUserId }: EmptyPackPropsType) => {
  return (
    <div className={s.emptyPackBlock}>
      <p>This pack is empty.</p>
      {userId === packUserId && (
        <CardModal
          typeButton={'superButton'}
          titleButton={'Add new card'}
          cardModalFunctional={addCard}
        />
      )}
    </div>
  )
}
