import React, {ChangeEvent, useEffect, useState} from "react";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {useDebounce} from "../../../../common/hooks/useDebounce";
import {AppDispatch} from "../../../../app/store";
import {useSelector} from "react-redux";
import {selectCardQuestion} from "../../../packs/selectors/selectCards";
import {getCards, setCardQuestion} from "../../cardsReducer";

type SearchCardsPropsType = {
		packID: string
}

export const SearchCards = ({packID}: SearchCardsPropsType) => {
		const [value, setValue] = useState<string>('')
		const debouncedValue = useDebounce<string>(value, 1000)
		const dispatch = AppDispatch()
		const searchCardQuestion = useSelector(selectCardQuestion)

		const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
				setValue(event.target.value)
		}

		useEffect(() => {
				dispatch(setCardQuestion(value))
		}, [debouncedValue])


		// useEffect(() => {
		// 		setValue(searchCardQuestion)
		// }, [searchCardQuestion])

		if (searchCardQuestion !== '') {
				dispatch(getCards(packID))
		}

		return (
				<Paper
						component="form"
						sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}
				>
						<InputBase
								sx={{ml: 1, flex: 1}}
								placeholder="Provide your text"
								inputProps={{'aria-label': 'search google maps'}}
								value={value}
								onChange={onChangeHandler}
						/>
						<SearchIcon/>
				</Paper>
		);
}