import React, {useState} from 'react'
import {BackToPacksList} from "../../common/components/backToPacksList/BackToPacksList";
import {CardType} from "../cards/CardsAPI";
import {useSelector} from "react-redux";
import {selectCardPacks} from "../packs/selectors";

export const Learn = () => {
    const pack = useSelector(selectCardPacks)
    const [card, setCard] = useState<CardType>({
        _id: 'fake',
        cardsPack_id: '',
        user_id: '',
        questionImg: '',
        answerImg: '',
        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,

        comments: '',
        type: '',
        rating: 0,
        more_id: '',

        created: '',
        updated: '',
    })


return (
    <>
        <BackToPacksList/>
        <div>
            <h2>{pack[0].name}</h2>
            <b>Question: {card.question}</b>
        </div>

    </>
  )
}
