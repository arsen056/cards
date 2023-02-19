import React from 'react';
import {useSelector} from "react-redux";
import {selectIsMyPacks, selectUserID} from "../../selectors";
import {AppDispatch} from "../../../../app/store";
import {setIsMyPacks, setMin, setUserId} from "../../packsReducer";
import s from './MyAllBtn.module.css'

export const MyOrAll = () => {
    const userID = useSelector(selectUserID)
    const IsMyPacks = useSelector(selectIsMyPacks)

    const dispatch = AppDispatch()

    const myPacksHandler = () => {
        dispatch(setMin(0))
        dispatch(setUserId(userID))
        dispatch(setIsMyPacks(true))
    }

    const allPacksHandler = () => {
        dispatch(setUserId(null))
        dispatch(setIsMyPacks(false))
    }

    const my = IsMyPacks ? s.pressed : ''
    const all = !IsMyPacks ? s.pressed : ''

    return (
        <div>
            <button className={`${s.btn} ${s.left} ${my}`} onClick={myPacksHandler}>My</button>
            <button className={`${s.btn} ${s.right} ${all}`} onClick={allPacksHandler}>All</button>
        </div>
    );
};

