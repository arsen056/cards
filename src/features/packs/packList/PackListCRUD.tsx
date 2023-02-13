import React from 'react';
import educationIcon from '../../../assets/learn.svg'
import editIcon from '../../../assets/edit.svg'
import deleteIcon from '../../../assets/delete.svg'
import {UpdatePackType} from "../PacksAPI";
import {useSelector} from "react-redux";
import {selectUserID} from "../selectors";
import s from './packList.module.css'


export const PackListCrud: React.FC<ActionButtonsContainerType> = ({
                                                                       id,
                                                                       userId,
                                                                       cardsCount,
                                                                       educationsAction,
                                                                       editAction,
                                                                       deleteAction
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

            <button/*onClick={e => educationCallback(e)}*/ className={s.button}>
                <img src={educationIcon} alt="education icon"/>
            </button>

            {userId === userProfileID && editAction && (
                <button onClick={editCallback} className={s.button} >
                    <img src={editIcon} alt="edit icon"/>
                </button>
            )}

            {userId === userProfileID && editAction && (
                <button onClick={deleteCallback} className={s.button}>
                    <img src={deleteIcon} alt="delete icon"/>
                </button>
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