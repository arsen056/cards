import s from "../../packs/header/HeaderPacks.module.css";
import style from './HeaderCards.module.css'
import {SearchPacks} from "../../packs/header/searchPack/SearchPacks";
import React from "react";
import {SuperButton} from "../../../common/components/SuperButton";
import {TitleCards} from "./titleCards/TitleCards";

type HeaderCardsPropsType = {
		title: string
		addCard: () => void
		packUserId: string
		userId: string
}

export const HeaderCards = ({title, addCard, userId, packUserId}: HeaderCardsPropsType) => {

		return (
				<div>
						<div className={`${s.wrapper} ${style.headerCards}`}>
								<div className={style.titleAndButton}>
										<TitleCards title={title}/>
										<SuperButton variant={'contained'}
																 color={'primary'}
																 onClick={userId === packUserId ? addCard : () => alert('Learning to start')}
										>
												{userId === packUserId ? 'Add new card' : 'Learn to pack'}
										</SuperButton>
								</div>
								<SearchPacks/>
						</div>
				</div>
		)
}