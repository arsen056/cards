import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React from "react";
import {CardType} from "../CardsAPI";
import {CardsCrud} from "./CardsCrud";

type CardItemPropsType = {
		card: CardType
		packID: string
		userId: string
		packUserId: string
}

export const CardItem = ({card, packID, userId, packUserId}: CardItemPropsType) => {
		return (
				<TableRow
						sx={{'&:last-child td, &:last-child th': {border: 0}}}
				>
						<TableCell component="th" scope="row">{card.question}</TableCell>
						<TableCell align="right">{card.answer}</TableCell>
						<TableCell align="right">{card.updated}</TableCell>
						<TableCell align="right">{card.grade}</TableCell>
						{userId === packUserId &&
                <TableCell align="right">
                    <CardsCrud cardId={card._id} packID={packID}/>
                </TableCell>}

				</TableRow>
		)
};
