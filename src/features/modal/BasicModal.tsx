import * as React from 'react';
import { ReactNode } from "react";

import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import { TypeButton } from './packModal/PackModal'

import deleteIcon from "assets/delete.svg";
import editIcon from 'assets/edit.svg'
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
}

export const BasicModal = ({
  children,
  titleButton,
  open,
  handleOpen,
  handleClose,
  typeButton,
}: Props) => {
	const button = typeButton === 'editIcon'
		? <IconButton onClick={handleOpen} size="small"><img src={editIcon} alt="edit icon"/></IconButton>
		: typeButton === 'deleteIcon'
			? <IconButton onClick={handleOpen} size="small"><img src={deleteIcon} alt="delete icon"/></IconButton>
			: <SuperButton onClick={handleOpen}>{titleButton}</SuperButton>
// export const BasicModal = ({children, titleButton, open, handleOpen, handleClose, typeButton}: Props) => {

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
