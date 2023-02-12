import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {FC} from "react";
import {CardType} from "../CardsAPI";

type CardItemPropsType = {
		card: CardType
}

export const CardItem: FC<CardItemPropsType> = ({card}) => {
		return (
				<TableRow
						sx={{'&:last-child td, &:last-child th': {border: 0}}}
				>
						<TableCell component="th" scope="row">{card.question}</TableCell>
						<TableCell align="right">{card.answer}</TableCell>
						<TableCell align="right">{card.updated}</TableCell>
						<TableCell align="right">{card.grade}</TableCell>
				</TableRow>
		)
				;
};
