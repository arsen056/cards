import * as React from 'react'
import { ChangeEvent, useState } from 'react'

import { Box, IconButton, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'

import { BasicModal } from '../BasicModal'

import s from './PackModal.module.css'

import close from 'assets/close.svg'
import { SuperButton } from 'common/components/SuperButton'
import { SuperCheckbox } from 'common/components/superCheckbox/SuperCheckbox'

export type TypeButton = 'editIcon' | 'superButton'

type Props = {
  packModalFunctional: (namePack: string, statusPrivate: boolean) => void
  typeButton: TypeButton
  titleButton?: string
  nameValue?: string
}

export const PackModal = ({ packModalFunctional, typeButton, titleButton, nameValue }: Props) => {
  const [open, setOpen] = React.useState(false)
  const [privatePackStatus, setPrivatePackStatus] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [value, setValue] = useState<string>('')
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  const changePackStatus = () => {
    setPrivatePackStatus(!privatePackStatus)
  }

  const onClickHandler = () => {
    packModalFunctional(value, privatePackStatus)
    setOpen(false)
  }

  return (
    <div>
      <BasicModal
        titleButton={titleButton}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        typeButton={typeButton}
      >
        <div>
          <div className={s.titleAndCloseBlock}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add new pack
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <img src={close} alt="edit icon" />
            </IconButton>
          </div>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Name pack"
              variant="standard"
              onChange={onChangeHandler}
              style={{ marginBottom: 30 }}
              value={value ? value : nameValue}
            />
          </Box>
          <SuperCheckbox onChange={changePackStatus}>Private pack</SuperCheckbox>
          <div className={s.buttonsBlock}>
            <SuperButton style={{ width: '40%' }} xType="secondary" onClick={handleClose}>
              Cancel
            </SuperButton>
            <SuperButton onClick={onClickHandler}>Save</SuperButton>
          </div>
        </div>
      </BasicModal>
    </div>
  )
}
