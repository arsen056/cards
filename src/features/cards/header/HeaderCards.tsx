import s from "../../packs/header/HeaderPacks.module.css";
import style from './HeaderCards.module.css'
import React from "react";
import {SuperButton} from "../../../common/components/SuperButton";
import {CardMenu} from "./cardMenu/cardMenu";
import {useSelector} from "react-redux";
import {selectCards} from "../../packs/selectors";
import {SearchCards} from "./searchCards/SeachCards";

type HeaderCardsPropsType = {
		title: string
		addCard: () => void
		packUserId: string
		userId: string
		packID: string
}

export const HeaderCards = ({addCard, userId, packUserId, packID}: HeaderCardsPropsType) => {

		const cards = useSelector(selectCards)
		const isEdited = userId === packUserId

		return (
				<div>
						<div className={`${s.wrapper} ${style.headerCards}`}>
								<div className={style.titleAndButton}>
										<div className={style.menu}>
												{/*<TitleCards title={title}/>*/}
												{isEdited && <CardMenu packID={packID}/>}
										</div>
										<SuperButton variant={'contained'}
																 color={'primary'}
																 onClick={userId === packUserId ? addCard : () => alert('Learning to start')}
										>
												{userId === packUserId ? 'Add new card' : 'Learn to pack'}
										</SuperButton>
								</div>

							{cards.length ? <SearchCards packID={packID}/> : undefined}
						</div>
				</div>
		)
}