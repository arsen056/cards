import s from "../../packs/header/HeaderPacks.module.css";
import style from './HeaderCards.module.css'
import {SearchPacks} from "../../packs/searchPack/SearchPacks";
import React from "react";
import {SuperButton} from "../../../common/components/SuperButton";
import {TitleCards} from "./titleCards/TitleCards";

export const HeaderCards = () => {
		return (
				<div>
						<div className={`${s.wrapper} ${style.headerCards}`}>
								<div className={style.titleAndButton}>
										<TitleCards title={'My cards'}/>
										<SuperButton variant={'contained'}
																 color={'primary'}
										>
												Add new card
										</SuperButton>
								</div>
								<SearchPacks/>
						</div>
				</div>
		)
}