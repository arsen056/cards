import s from "../../packs/header/HeaderPacks.module.css";
import style from './HeaderCards.module.css'
import {SearchPacks} from "../../packs/searchPack/SearchPacks";
import React from "react";
import {SuperButton} from "../../../common/components/SuperButton";
import {TitleCards} from "./titleCards/TitleCards";
import {AppDispatch} from "../../../app/store";
import {addCardTC} from "../cardsReducer";

type HeaderCardsPropsType = {
		title: string
		packID: string
}

export const HeaderCards = ({title, packID}: HeaderCardsPropsType) => {
		const dispatch = AppDispatch()

		const addCard = () => {
				dispatch(addCardTC({card: {
						cardsPack_id: packID,
						question: "how do you like this task?",
						answer: "It is wonderful",
						grade: 2
				}}))
		}
		return (
				<div>
						<div className={`${s.wrapper} ${style.headerCards}`}>
								<div className={style.titleAndButton}>
										<TitleCards title={title}/>
										<SuperButton variant={'contained'}
																 color={'primary'}
																 onClick={addCard}
										>
												Add new card
										</SuperButton>
								</div>
								<SearchPacks/>
						</div>
				</div>
		)
}