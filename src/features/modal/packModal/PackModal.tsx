import * as React from 'react'
import { ChangeEvent, useState } from 'react'

import { Box, IconButton, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'

import { BasicModal } from '../BasicModal'

import s from './PackModal.module.css'

import close from 'assets/close.svg'
import { SuperButton } from 'common/components/SuperButton'
import { SuperCheckbox } from 'common/components/superCheckbox/SuperCheckbox'

export type TypeButton = 'editIcon' | 'superButton' | 'deleteIcon'

type Props = {
	packModalFunctional: (namePack: string, statusPrivate: boolean) => void
	typeButton: TypeButton
	titleButton?: string
	nameValue?: string
}

export const PackModal = ({packModalFunctional, typeButton, titleButton, nameValue}: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	const [privatePackStatus, setPrivatePackStatus] = useState<boolean>(false)
	const [value, setValue] = useState<string>('')
	const [error, setError] = useState<boolean>(false)
	const handleOpen = () => {
		setOpen(true);
		setValue(nameValue || '')
	}
	const handleClose = () => {
		setOpen(false);
		setError(false)
	}


	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setError(false)
		setValue(event.target.value)
	}
	const changePackStatus = () => {
		setPrivatePackStatus(!privatePackStatus)
	}

	const onClickHandler = () => {
		if (value === '') {
			setError(true)
		} else {
			packModalFunctional(value, privatePackStatus)
			setError(false)
			setOpen(false)
		}
	}

	return (
		<div>
			<BasicModal titleButton={titleButton} open={open} handleOpen={handleOpen} handleClose={handleClose}
									typeButton={typeButton}>
				<div>
					<div className={s.titleAndCloseBlock}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							{typeButton === 'superButton'
								? 'Add new pack'
								: typeButton === 'deleteIcon'
									? 'Delete pack' : 'Edit pack'}
						</Typography>
						<IconButton onClick={handleClose} size="small">
							<img src={close} alt="edit icon"/>
						</IconButton>
					</div>
					<Box
						component="form"
						sx={{
							'& > :not(style)': {m: 0, width: '40ch'},
						}}
						noValidate
						autoComplete="off"
					>
						{typeButton === 'deleteIcon'
							? <Typography id="modal-modal-description">
								Do you really want to remove <b>{nameValue}</b>?
									<React.Fragment><br/></React.Fragment>
									All cards will be deleted.
							</Typography>
							: <TextField
								id="standard-basic"
								label="Name pack"
								variant="standard"
								onChange={onChangeHandler}
								style={{marginBottom: 10}}
								value={value}
								error={error}
								helperText={error ? 'Please enter the name of the pack' : ' '}
							/>
						}
					</Box>
					{typeButton === 'deleteIcon' ? '' : <SuperCheckbox onChange={changePackStatus}>Private pack</SuperCheckbox>}
					<div className={s.buttonsBlock}>
						<SuperButton style={{width: '40%'}} xType='secondary' onClick={handleClose}>Cancel</SuperButton>
						{typeButton === 'deleteIcon'
							? <SuperButton style={{backgroundColor: '#FF3636'}} onClick={onClickHandler}>Delete</SuperButton>
							: <SuperButton onClick={onClickHandler}>Save</SuperButton>}
					</div>
				</div>
			</BasicModal>
		</div>
	)
}
