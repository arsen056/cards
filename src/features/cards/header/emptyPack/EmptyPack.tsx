import {BackToPacksList} from "../../../../common/components/backToPacksList/BackToPacksList";
import {TitleCards} from "../titleCards/TitleCards";
import {SuperButton} from "../../../../common/components/SuperButton";
import React from "react";
import s from './EmptyPack.module.css'

type EmptyPackPropsType = {
		title: string
		addCard: () => void
		userId: string
		packUserId: string
}

export const EmptyPack = ({title, addCard, userId, packUserId}: EmptyPackPropsType) => {
  return (
			<div className={'container pading-vertical'}>
					<BackToPacksList/>
					<TitleCards title={title}/>
					<div className={s.emptyPackBlock}>
							<p>This pack is empty.</p>
							{userId === packUserId && <SuperButton variant={'contained'}
                                                     color={'primary'}
                                                     onClick={addCard}
              >
                  Add new card
              </SuperButton>}

					</div>
			</div>
	)
}