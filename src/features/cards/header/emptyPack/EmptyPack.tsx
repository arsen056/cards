import {SuperButton} from "common/components/SuperButton";
import React from "react";
import s from './EmptyPack.module.css'

type EmptyPackPropsType = {
  addCard: () => void
  userId: string
  packUserId: string
}

export const EmptyPack = ({addCard, userId, packUserId}: EmptyPackPropsType) => {
  return (

    <div className={s.emptyPackBlock}>
      <p>This pack is empty.</p>
      {userId === packUserId && <SuperButton variant={'contained'}
                                             color={'primary'}
                                             onClick={addCard}
      >
          Add new card
      </SuperButton>}

    </div>

  )
}