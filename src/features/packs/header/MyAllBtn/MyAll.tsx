import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectUserID} from "../../selectors";
import {AppDispatch} from "../../../../app/store";
import {setUserId} from "../../packsReducer";
import s from './MyAllBtn.module.css'

export const MyOrAll = () => {
    const [filter, setFilter] = useState<'my' | 'all'>('all')

    const userID = useSelector(selectUserID)

    const dispatch = AppDispatch()

    const myPacksHandler = () => {
        dispatch(setUserId(userID))
        setFilter('my')
    }

    const allPacksHandler = () => {
        dispatch(setUserId(null))
        setFilter('all')
    }

    const my = filter === 'my' ? s.pressed : ''
    const all = filter === 'all' ? s.pressed : ''


    useEffect(() => {

    }, [my, all])


    return (
        <div>
            <button className={`${s.btn} ${s.left} ${my}`} onClick={myPacksHandler}>My</button>
            <button className={`${s.btn} ${s.right} ${all}`} onClick={allPacksHandler}>All</button>
        </div>
    );
};
