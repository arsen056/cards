import * as React from 'react'
import { ChangeEvent, useState } from 'react'

import { PhotoCamera } from '@mui/icons-material'
import { Box, IconButton, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'

import { BasicModal } from '../BasicModal'

import s from './PackModal.module.css'

import { AppDispatch } from 'app/store'
import close from 'assets/close.svg'
import { SuperButton } from 'common/components/SuperButton'
import { SuperCheckbox } from 'common/components/superCheckbox/SuperCheckbox'
import { uploadPicture } from 'common/utils/uploadPicture'

export type TypeButton = 'editIcon' | 'superButton' | 'deleteIcon'

type Props = {
  packModalFunctional: (namePack: string, statusPrivate: boolean, deckCover: string) => void
  typeButton: TypeButton
  titleButton?: string
  nameValue?: string
  coverPack?: string
  helpText?: string
}

export const PackModal = ({
  packModalFunctional,
  typeButton,
  titleButton,
  nameValue,
  coverPack,
  helpText,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [privatePackStatus, setPrivatePackStatus] = useState<boolean>(false)
  const [deckCover, setDeckCover] = useState<string>(coverPack || '')

  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const dispatch = AppDispatch()
  const handleOpen = () => {
    setOpen(true)
    setValue(nameValue || '')
  }
  const handleClose = () => {
    setOpen(false)
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
      packModalFunctional(value, privatePackStatus, deckCover)
      setError(false)
      setOpen(false)
    }
  }

  const uploadHandler = uploadPicture(setDeckCover, dispatch)

  let titleModal

  if (typeButton === 'deleteIcon') titleModal = 'Delete pack'
  else if (typeButton === 'superButton') titleModal = 'Add new pack'
  else titleModal = 'Edit pack'

  return (
    <div>
      <BasicModal
        titleButton={titleButton}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        typeButton={typeButton}
        helpText={helpText}
      >
        <div>
          <div className={s.titleAndCloseBlock}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {titleModal}
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <img src={close} alt="edit icon" />
            </IconButton>
          </div>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 0, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
          >
            {typeButton === 'deleteIcon' ? (
              <Typography id="modal-modal-description">
                Do you really want to remove <b>{nameValue}</b>?
                <React.Fragment>
                  <br />
                </React.Fragment>
                All cards will be deleted.
              </Typography>
            ) : (
              <>
                <TextField
                  id="standard-basic"
                  label="Name pack"
                  variant="standard"
                  onChange={onChangeHandler}
                  style={{ marginBottom: 10 }}
                  value={value}
                  error={error}
                  helperText={error ? 'Please enter the name of the pack' : ' '}
                />
                <span>
                  Upload cover
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" onChange={uploadHandler} />
                    <PhotoCamera />
                  </IconButton>
                </span>

                <div className={s.packCoverWrapper}>
                  <img src={deckCover} alt="pack cover" />
                </div>
              </>
            )}
          </Box>
          {typeButton === 'deleteIcon' ? (
            ''
          ) : (
            <SuperCheckbox onChange={changePackStatus}>Private pack</SuperCheckbox>
          )}
          <div className={s.buttonsBlock}>
            <SuperButton style={{ width: '40%' }} xType="secondary" onClick={handleClose}>
              Cancel
            </SuperButton>
            {typeButton === 'deleteIcon' ? (
              <SuperButton style={{ backgroundColor: '#FF3636' }} onClick={onClickHandler}>
                Delete
              </SuperButton>
            ) : (
              <SuperButton onClick={onClickHandler}>Save</SuperButton>
            )}
          </div>
        </div>
      </BasicModal>
    </div>
  )
}
