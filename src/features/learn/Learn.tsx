import React, {useEffect, useState} from 'react'
import {CardType} from "../cards/CardsAPI";
import {useSelector} from "react-redux";
import {selectCardPacks, selectCardPacksTotaCount} from "../packs/selectors";
import s from './Learn.module.css'
import {selectCardQuestion, selectCards, selectCardsPage, selectCardsPageCount} from "../cards/selectors";
import {AppDispatch} from "../../app/store";
import {useParams} from "react-router-dom";
import {BackToPacksList} from "../../common/components/backToPacksList/BackToPacksList";
import {SuperButton} from "../../common/components/SuperButton";
import {SuperRadio} from "../../common/components/superRadio/SuperRadio";
import {getCards, setCardGradeTC, setCardsPageCount} from "../cards/cardsReducer";

export const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
    const rand = Math.random() * sum
    const res = cards.reduce(
        (acc: { sum: number; id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        },
        {sum: 0, id: -1}
    )

    return cards[res.id + 1]
}

export const Learn = () => {
    const dispatch = AppDispatch()
    const cards = useSelector(selectCards)
    const packName = useSelector(selectCardPacks)
    const cardsCount = useSelector(selectCardPacksTotaCount)

    const answerArr = [
        {id: '1', value: 'Did not know'},
        {id: '2', value: 'Forgot'},
        {id: '3', value: 'A lot of thought'},
        {id: '4', value: 'Confused'},
        {id: '5', value: 'Knew the answer'},
    ]

    let [value, onChangeOption] = useState<string>('0')
    const [isShow, setIsShow] = useState<boolean>(false)
    const [cardAnswer, setCardAnswer] = useState<CardType>()
    const {id} = useParams()

    useEffect(() => {
        dispatch(setCardsPageCount(cardsCount))
        id && dispatch(getCards(id))
    }, [])

    useEffect(() => {
        setCardAnswer(getCard(cards))
    }, [cards])

    useEffect(() => {
        onChangeOption('0')
    }, [isShow])

    const onClickHandler = (grade: string) => {
        setIsShow(false)
        dispatch(setCardGradeTC(grade, cardAnswer!._id))
        console.log(cardAnswer!._id)
    }

    return (
        <div>
            <BackToPacksList/>
            <h2 className={s.title}>Learn: {packName[0].name}</h2>
            <div className={s.wrapper}>
                <div className={s.learnContainer}>
                    <div className={s.questionWrapper}>
                        <div className={s.titleQuestion}>Question: </div>
                        <div className={s.textQuestion}>
                            {cardAnswer &&
                                (cardAnswer.questionImg ? (
                                    <img className={s.cover} src={cardAnswer.questionImg} alt="questionImg"/>
                                ) : (
                                    cardAnswer.question
                                ))}
                        </div>
                    </div>

                    <div className={s.titleQuantityAnswer}>
                        Количество попыток ответа:
                        <span className={s.quantityAnswer}>{cardAnswer && cardAnswer.shots}</span>
                    </div>
                    <div className={s.wrapperButton}>
                        <SuperButton
                            onClick={() => setIsShow(true)}
                            disabled={isShow}>
                            Show answer
                        </SuperButton>
                    </div>
                    {isShow ? (
                        <>
                            <div className={s.answerWrapper}>
                                <div className={s.titleQuestion}>Answer:</div>
                                <div className={s.textQuestion}>{cardAnswer && cardAnswer.answer}</div>
                            </div>
                            <div className={s.textRate}>Rate yourself:</div>
                            <div className={s.form}>
                                <div className={s.wrapperSuperRadio}>
                                    <SuperRadio
                                        name={'radio'}
                                        options={answerArr}
                                        value={value}
                                        onChangeOption={onChangeOption}
                                    />
                                </div>
                                <div className={s.wrapperButton}>
                                    <SuperButton
                                        onClick={() => onClickHandler(value)}
                                        disabled={value === '0'}>
                                        Next
                                    </SuperButton>
                                </div>
                            </div>
                        </>
                    ) : null}

                </div>
            </div>

        </div>
    )
}