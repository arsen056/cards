import React, {useState} from 'react';
import educationIcon from '../../../assets/learn.svg'
import editIcon from '../../../assets/edit.svg'
import deleteIcon from '../../../assets/delete.svg'
import {useSelector} from "react-redux";
import {selectUserID} from "../selectors";
import s from './packList.module.css'
import {UpdatePackType} from "../PacksAPI";
import {Button, IconButton} from "@mui/material";
import {selectIsDisabled} from "../selectors/selectIsDisabled";


export const PackListCrud: React.FC<ActionButtonsContainerType> = ({
                                                                       id, userId, cardsCount,
                                                                       educationsAction, editAction, deleteAction
                                                                   }) => {


    const userProfileID = useSelector(selectUserID)

    const deleteCallback = () => {
        deleteAction && deleteAction(id)
    }

    const editCallback = () => {
        editAction && editAction({cardsPack: {_id: id, name: 'new Card'}})
    }


    return (
        <div>
            {educationsAction && (
                <IconButton size="small" disabled={cardsCount === 0} className={cardsCount === 0 ? s.disabled : s.button}>
                    <img src={educationIcon} alt="education icon"/>
                </IconButton>)}

            {userId === userProfileID && editAction && (
                <IconButton onClick={editCallback} size="small">
                    <img src={editIcon} alt="edit icon"/>
                </IconButton>
            )}

            {userId === userProfileID && editAction && (
                <IconButton onClick={deleteCallback} size="small">
                    <img src={deleteIcon} alt="delete icon"/>
                </IconButton>
            )}
        </div>
    );
};

export type ActionButtonsContainerType = {
    id: string
    userId: string
    educationsAction?: (id: string) => void
    editAction?: (data: UpdatePackType) => void
    deleteAction?: (id: string) => void
    cardsCount: number
}