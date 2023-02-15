import s from "../../packs/header/HeaderPacks.module.css";
import style from './HeaderCards.module.css'
import {SearchPacks} from "../../packs/header/searchPack/SearchPacks";
import React from "react";
import {SuperButton} from "../../../common/components/SuperButton";
import {TitleCards} from "./titleCards/TitleCards";
import {CardMenu} from "./cardMenu/cardMenu";

type HeaderCardsPropsType = {
		title: string
		addCard: () => void
		packUserId: string
		userId: string
		packID: string
}

export const HeaderCards = ({title, addCard, userId, packUserId, packID}: HeaderCardsPropsType) => {



		return (
				<div>
						<div className={`${s.wrapper} ${style.headerCards}`}>
								<div className={style.titleAndButton}>
										<div className={style.menu}>
												<TitleCards title={title}/><CardMenu packID={packID}/>
										</div>
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