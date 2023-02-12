import React, {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {AppDispatch} from "../../../app/store";
import {useSelector} from "react-redux";
import {CardItem} from "./CardItem";
import {getCards} from "../cardsReducer";
import {selectCards} from "../../../common/selectors/selectCards";
import {useParams} from "react-router-dom";

export const CardsList = () => {
		const dispatch = AppDispatch()
		const {packID} = useParams();
		const cards = useSelector(selectCards)


		useEffect(() => {
				dispatch(getCards(packID))
		}, [packID])

		return (
				<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
										<TableRow>
												<TableCell>Question</TableCell>
												<TableCell align="right">Answer</TableCell>
												<TableCell align="right">Last Updated</TableCell>
												<TableCell align="right">Grade</TableCell>
												<TableCell align="right">Actions</TableCell>
										</TableRow>
								</TableHead>

								<TableBody>
										{cards.map((card) => (
												<CardItem key={card._id} card={card}/>
										))}
								</TableBody>

						</Table>
				</TableContainer>
		);
}