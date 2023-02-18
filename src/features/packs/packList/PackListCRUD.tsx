import React from 'react';
import educationIcon from '../../../assets/learn.svg'
import deleteIcon from '../../../assets/delete.svg'
import {useSelector} from "react-redux";
import {selectUserID} from "../selectors";
import s from './packList.module.css'
import {UpdatePackType} from "../PacksAPI";
import {IconButton} from "@mui/material";
import {PackModal} from "../../modal/packModal/PackModal";


export const PackListCrud: React.FC<ActionButtonsContainerType> = ({
 id, userId, cardsCount, educationsAction, editAction, deleteAction, packName
}) => {

    const userProfileID = useSelector(selectUserID)

    const deleteCallback = () => {
        deleteAction && deleteAction(id)
    }

    const editCallback = (packName: string, statusPrivate: boolean) => {
        editAction && editAction({cardsPack: {_id: id, name: packName, private: statusPrivate}})
    }


    return (
        <div>
            {educationsAction && (
                <IconButton size="small" disabled={cardsCount === 0}
                            className={cardsCount === 0 ? s.disabled : s.button}>
                    <img src={educationIcon} alt="education icon"/>
                </IconButton>)}

            {userId === userProfileID && editAction && (
              <div style={{display: "inline-block"}}>
                  <PackModal packModalFunctional={editCallback} typeButton={'editIcon'} nameValue={packName}/>
              </div>
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
    packName: string
}