import {CardsList} from "./cardsList/CardsList";
import {HeaderCards} from "./header/HeaderCards";
import React, {useEffect} from "react";
import {BackToPacksList} from "../../common/components/backToPacksList/BackToPacksList";
import {SuperPagination} from "../../common/components/superPagination/SuperPagination";
import {useSelector} from "react-redux";
import {AppDispatch} from "../../app/store";
import {useParams, useSearchParams} from "react-router-dom";
import {getCards, setCardsPage, setCardsPageCount} from "./cardsReducer";
import {
		selectCards,
		selectCardsPage,
		selectCardsPackName,
		selectCardsTotalCount,
		selectCardsPageCount
} from "../packs/selectors/index";

export const Cards = () => {
		const dispatch = AppDispatch()
		const {packID} = useParams();
		const cards = useSelector(selectCards)
		const cardsPackName = useSelector(selectCardsPackName)
		const cardsTotalCountCards = useSelector(selectCardsTotalCount)
		const cardsPage = useSelector(selectCardsPage)
		const cardsPageCount = useSelector(selectCardsPageCount)
		const [searchParams, setSearchParams] = useSearchParams()


		useEffect(() => {
				dispatch(getCards(packID))
		}, [packID])

		const onChangePagination = (pageCardsNumber: number, pageCardsCount: number) => {
				dispatch(setCardsPage(pageCardsNumber));
				dispatch(setCardsPageCount(pageCardsCount))
				setSearchParams({page: `${pageCardsNumber}`, pageCount: `${pageCardsCount}`})
		}

		return (
				<div className={'container pading-vertical'}>
						<BackToPacksList/>
						<HeaderCards title={cardsPackName} packID={packID ? packID : ''}/>
						<CardsList cards={cards}/>
						<SuperPagination
								page={cardsPage}
								itemsCountForPage={cardsPageCount}
								totalCount={cardsTotalCountCards}
								onChange={onChangePagination}
						/>
				</div>
		)
}