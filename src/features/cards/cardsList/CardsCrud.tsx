import {IconButton} from "@mui/material";
import React from "react";
import deleteIcon from "../../../assets/delete.svg";
import editIcon from "../../../assets/edit.svg";
import {deleteCardTC} from "../cardsReducer";
import {AppDispatch} from "../../../app/store";

type CardsCrudType = {
		cardId: string
		packID: string
}

export const CardsCrud = ({cardId, packID}: CardsCrudType) => {
		const dispatch = AppDispatch()
		const deleteCard = () => {
				dispatch(deleteCardTC(cardId, packID))
		}
		return (
				<div>
						<IconButton onClick={() => {alert('edit')}} size="small">
								<img src={editIcon} alt="edit icon"/>
						</IconButton>
						<IconButton onClick={deleteCard} size="small">
								<img src={deleteIcon} alt="delete icon"/>
						</IconButton>
				</div>
		)
}