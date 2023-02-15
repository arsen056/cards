import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {CardItem} from "./CardItem";
import {CardType} from "../CardsAPI";

type CardsListPropsType = {
		cards: CardType[]
		userId: string
		packUserId: string
		packID: string
}

export const CardsList = ({cards, userId, packUserId, packID}: CardsListPropsType) => {
		// const appStatus = useSelector(selectStatus)

		// if (appStatus === 'loading') {
		// 		return <Loader/>
		// }
		return (
				<TableContainer component={Paper} sx={{marginBottom: '20px'}}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
										<TableRow>
												<TableCell>Question</TableCell>
												<TableCell align="right">Answer</TableCell>
												<TableCell align="right">Last Updated</TableCell>
												<TableCell align="right">Grade</TableCell>
												{userId === packUserId &&
												<TableCell align="right">Actions</TableCell>}
										</TableRow>
								</TableHead>
								<TableBody>
										{cards.map((card) => (
												<CardItem key={card._id} card={card} packID={packID} userId={userId} packUserId={packUserId}/>
										))}
								</TableBody>
						</Table>
				</TableContainer>
		);
}