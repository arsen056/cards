import React from 'react';
import {useSelector} from "react-redux";
import {selectUserID} from "../../selectors";
import {AppDispatch} from "../../../../app/store";
import {setIsMyPacks, setUserId} from "../../packsReducer";
import s from './MyAllBtn.module.css'
import {selectIsMyPacks} from "../../selectors/selectMyPacks";

export const MyOrAll = () => {
    const userID = useSelector(selectUserID)
    const IsMyPacks = useSelector(selectIsMyPacks)

    const dispatch = AppDispatch()

    const myPacksHandler = () => {

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

