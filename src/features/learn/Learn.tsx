import React, {useState} from 'react'
import {BackToPacksList} from "../../common/components/backToPacksList/BackToPacksList";
import {CardType, LearnCardType} from "../cards/CardsAPI";
import {useSelector} from "react-redux";
import {selectCardPacks} from "../packs/selectors";
import s from './Learn.module.css'
import {SuperButton} from "../../common/components/SuperButton";
import {SuperCheckbox} from "../../common/components/superCheckbox/SuperCheckbox";
import {selectCards} from "../cards/selectors";
import {selectIsLoggedIn} from "../../common/selectors";
import {AppDispatch} from "../../app/store";
import {gradeCardUpdateTC} from "../cards/cardsReducer";
import {Grid} from "@mui/material";

const grades = ['Did not know', 'forgot', 'A lot of thought', 'Confused', 'Knew the answer']

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade!) * (6 - card.grade!), 0)
    const rand = Math.random() * sum
    const res = cards.reduce(
        (acc: { sum: number; id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade!) * (6 - card.grade!)
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        },
        {sum: 0, id: -1}
    )
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1]
}

export const Learn = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const pack = useSelector(selectCardPacks)
    const cards = useSelector(selectCards)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const dispatch = AppDispatch()

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

    if (cards?.length < 0) {
        return <div>cards not defined</div>
    }

    const onNext = () => {
        setIsChecked(false)

        if (cards.length > 0) {
            setCard(getCard(cards))
        } else {
        }
    }


    const gradeUpdate = (data: LearnCardType) => {
        dispatch(gradeCardUpdateTC(data))
    }

    if (!isLoggedIn) {
        return <div> Not login user</div>
    }


    return (
        <>
            <BackToPacksList/>
            <h2 className={s.title}>Learn: {pack[0].name}</h2>
            <div className={s.wrapper}>
                <div className={s.learnContainer}>
                    <Grid container justifyContent={'center'}>
                        <Grid item justifyContent={'center'} marginTop={5}>

                            <div className={s.text}>
                                <b>Question: {card.question}</b>
                                <h5 style={{color: 'gray'}}>Количество попыток ответов на вопрос:{card.shots}</h5>
                                <div className={s.button}>
                                    <SuperButton onClick={() => setIsChecked(true)}>Show answer</SuperButton>
                                </div>
                                {isChecked && (
                                    <>
                                        <b>Answer:{card.answer}</b>

                                        {grades.map((g, i) => (
                                            <div className={s.sendBtn}>
                                                <SuperCheckbox className={s.grade} key={'grade-' + i}
                                                               onClick={() => gradeUpdate({
                                                                   grade: i + 1,
                                                                   card_id: card._id
                                                               })}>
                                                    {g}
                                                </SuperCheckbox>
                                            </div>
                                        ))}
                                        <div className={s.button}>
                                            <SuperButton onClick={onNext}>next</SuperButton>
                                        </div>
                                    </>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}
