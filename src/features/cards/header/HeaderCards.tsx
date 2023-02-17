import s from "../../packs/header/HeaderPacks.module.css";
import style from './HeaderCards.module.css'
import React, {FC} from "react";
import {SuperButton} from "../../../common/components/SuperButton";
import {CardMenu} from "./cardMenu/cardMenu";
import {Search} from "../../../common/components/search/Search";
import {setCardQuestion} from "../cardsReducer";

type HeaderCardsPropsType = {
		title: string
		addCard: () => void
		packUserId: string
		userId: string
		packID: string
}

export const HeaderCards:FC<HeaderCardsPropsType> = ({addCard, userId, packUserId, packID, title}) => {
		const isEdited = userId === packUserId

		return (
				<div>
						<div className={`${s.wrapper} ${style.headerCards}`}>
								<div className={style.titleAndButton}>
										<div className={style.menu}>
												<h2>{title}</h2>
												{isEdited && <CardMenu packID={packID}/>}
										</div>
										<SuperButton variant={'contained'}
																 color={'primary'}
																 onClick={userId === packUserId ? addCard : () => alert('Learning to start')}
										>
												{userId === packUserId ? 'Add new card' : 'Learn to pack'}
										</SuperButton>
								</div>

							<Search setNameAC={setCardQuestion}/>
						</div>
				</div>
		)
}