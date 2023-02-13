import React from 'react';
import educationIcon from '../../../assets/learn.svg'
import editIcon from '../../../assets/edit.svg'
import deleteIcon from '../../../assets/delete.svg'
import {UpdatePackType} from "../PacksAPI";


export const PackListCrud: React.FC<ActionButtonsContainerType> = ({
                                                                       id,
                                                                       userId,
                                                                       cardsCount,
                                                                       educationsAction,
                                                                       editAction,
                                                                       deleteAction
                                                                   }) => {

    const deleteCallback = () => {
        deleteAction && deleteAction(id)
    }

    const editCallback = () => {
        editAction && editAction({ cardsPack: { _id: id, name: 'new Card' } })
    }


    return (
        <div>

            <button>
                <img src={educationIcon} alt="education icon"/>
            </button>


            <button onClick={editCallback}>
                <img src={editIcon} alt="edit icon"/>
            </button>


            <button onClick={deleteCallback}>
                <img src={deleteIcon} alt="delete icon"/>
            </button>


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