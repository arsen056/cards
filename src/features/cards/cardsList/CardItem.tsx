import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React from "react";
import {CardType} from "../CardsAPI";
import {CardsCrud} from "./CardsCrud";
import {isoToDate} from "common/utils/time";
import {Rating} from "@mui/material";

type CardItemPropsType = {
		card: CardType
		packID: string
		userId: string
		packUserId: string
}

export const CardItem = ({card, packID, userId, packUserId}: CardItemPropsType) => {

		const time = isoToDate(card.updated)

		return (
				<TableRow
						sx={{'&:last-child td, &:last-child th': {border: 0}}}
				>
						<TableCell component="th" scope="row">{card.question}</TableCell>
						<TableCell align="right">{card.answer}</TableCell>
						<TableCell align="right">{time}</TableCell>
						<TableCell align="right">
							<Rating name="read-only" value={card.grade} readOnly />
						</TableCell>
						{userId === packUserId &&
                <TableCell align="right">
                    <CardsCrud cardId={card._id} packID={packID}/>
                </TableCell>}

				</TableRow>
		)
};
