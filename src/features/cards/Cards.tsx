import {CardsList} from "./cardsList/CardsList";
import {HeaderCards} from "./header/HeaderCards";
import React, {memo, useEffect} from "react";
import {BackToPacksList} from "../../common/components/backToPacksList/BackToPacksList";
import {SuperPagination} from "../../common/components/superPagination/SuperPagination";
import {useSelector} from "react-redux";
import {AppDispatch} from "../../app/store";
import {Navigate, useParams} from "react-router-dom";
import {addCardTC, getCards, setCardsPage, setCardsPageCount} from "./cardsReducer";
import {
  selectCards,
  selectCardsPage,
  selectCardsPackName,
  selectCardsTotalCount,
  selectCardsPageCount, selectUserID,
} from "../packs/selectors";
import {EmptyPack} from "./header/emptyPack/EmptyPack";
import {selectIsLoggedIn, selectStatus} from "../../common/selectors";
import {selectCardQuestion, selectIsDeleted, selectPackUserId} from "../packs/selectors/selectCards";
import {Loader} from "../../common/components/loader/Loader";

export const Cards = memo(() => {

  const dispatch = AppDispatch()
  const {packID} = useParams();
  const cards = useSelector(selectCards)
  const cardsPackName = useSelector(selectCardsPackName)
  const cardsTotalCountCards = useSelector(selectCardsTotalCount)
  const cardsPage = useSelector(selectCardsPage)
  const cardsPageCount = useSelector(selectCardsPageCount)
  const appStatus = useSelector(selectStatus)
  const userId = useSelector(selectUserID)
  const packUserId = useSelector(selectPackUserId)
  const cardQuestion = useSelector(selectCardQuestion)


  useEffect(() => {
    dispatch(getCards(packID))
  }, [cardsPage, cardsPageCount, cardQuestion])

  const onChangePagination = (pageCardsNumber: number, pageCardsCount: number) => {
    dispatch(setCardsPage(pageCardsNumber));
    dispatch(setCardsPageCount(pageCardsCount))
  }

  const addCard = () => {
    dispatch(addCardTC({
      card: {
        cardsPack_id: packID as string,
        question: "how do you like this task?",
        answer: "It is wonderful",
        grade: 0
      }
    }))
  }

  const isLoggedIn = useSelector(selectIsLoggedIn)
  if (!isLoggedIn) {
    return <Navigate to={'/login'}/>
  }

  const isDeleted = useSelector(selectIsDeleted)
  if (isDeleted) {
    return <Navigate to={'/packs'}/>
  }

  return (
    <div className={'container padding-vertical'}>
      <BackToPacksList/>
      <HeaderCards title={cardsPackName} addCard={addCard} userId={userId} packUserId={packUserId}
                   packID={packID ? packID : ''}/>

      {appStatus === 'loading' ? <Loader/>
        : cards.length
            ? <>
              <CardsList cards={cards} userId={userId} packUserId={packUserId} packID={packID ? packID : ''}/>
              <SuperPagination
                page={cardsPage}
                itemsCountForPage={cardsPageCount}
                totalCount={cardsTotalCountCards}
                onChange={onChangePagination}
              />
            </>
            : <EmptyPack addCard={addCard} userId={userId} packUserId={packUserId}/>
        }

    </div>
  )
})

