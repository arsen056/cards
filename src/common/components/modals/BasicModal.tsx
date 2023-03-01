import * as React from 'react'
import { ReactNode } from 'react'

import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import deleteIcon from 'assets/delete.svg'
import editIcon from 'assets/edit.svg'
import { TypeButton } from 'common/components/modals/packModal/PackModal'
import { SuperButton } from 'common/components/SuperButton'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  paddingTop: 1,
  paddingBottom: 4,
  paddingLeft: 3,
  paddingRight: 3,
}

type Props = {
  children: ReactNode
  titleButton?: string
  open: boolean
  handleOpen: () => void
  handleClose: () => void
  typeButton: TypeButton
  helpText?: string
  cardsLength?: number
}

export const BasicModal = ({
  children,
  titleButton,
  open,
  handleOpen,
  handleClose,
  typeButton,
  helpText,
  cardsLength,
}: Props) => {
  const disableButton = cardsLength === 0 && titleButton === 'Learn to pack'

  let button

  if (typeButton === 'editIcon') {
    button = (
      <IconButton onClick={handleOpen} size="small">
        <img src={editIcon} alt="edit icon" />
        {helpText}
      </IconButton>
    )
  } else if (typeButton === 'deleteIcon') {
    button = (
      <IconButton onClick={handleOpen} size="small">
        <img src={deleteIcon} alt="delete icon" />
        {helpText}
      </IconButton>
    )
  } else
    button = (
      <SuperButton disabled={disableButton} onClick={handleOpen}>
        {titleButton}
      </SuperButton>
    )

  return (
    <div>
      {button}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  )
}
