import * as React from 'react'
import { ChangeEvent, useState } from 'react'

import { Box, IconButton, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import { AppDispatch } from '../../../app/store'
import { setCardsCards } from '../../cards/cardsReducer'
import { BasicModal } from '../BasicModal'
import { TypeButton } from '../packModal/PackModal'
import s from '../packModal/PackModal.module.css'

import close from 'assets/close.svg'
import { SuperButton } from 'common/components/SuperButton'

type Props = {
  cardModalFunctional: (question: string, answer: string) => void
  typeButton: TypeButton
  titleButton?: string
  question?: string
  answer?: string
  packID?: string
}

export const CardModal = ({
  cardModalFunctional,
  typeButton,
  titleButton,
  answer,
  question,
  packID,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [questionCard, setQuestionCard] = useState<string>('')
  const [answerCard, setAnswerCard] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const dispatch = AppDispatch()
  const navigate = useNavigate()
  const handleOpen = () => {
    if (titleButton === 'Learn to pack') {
      dispatch(setCardsCards([]))
      navigate(`/learn/${packID}`)
    } else {
      setOpen(true)
      setQuestionCard(question || '')
      setAnswerCard(answer || '')
    }
  }
  const handleClose = () => {
    setOpen(false)
    setError(false)
  }

  const onChangeHandlerQuestion = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionCard(event.target.value)
  }
  const onChangeHandlerAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswerCard(event.target.value)
  }

  const onClickHandlerElseCondition = () => {
    cardModalFunctional(questionCard, answerCard)
    setError(false)
    setOpen(false)
  }

  const onClickHandler = () => {
    if (typeButton !== 'deleteIcon') {
      if (questionCard === '' || answerCard === '') setError(true)
      else onClickHandlerElseCondition()
    } else onClickHandlerElseCondition()
  }

  let titleModal

  if (typeButton === 'deleteIcon') titleModal = 'Delete card'
  else if (typeButton === 'superButton') titleModal = 'Add new card'
  else titleModal = 'Edit card'

  const button =
    typeButton === 'deleteIcon' ? (
      <SuperButton style={{ backgroundColor: '#FF3636' }} onClick={onClickHandler}>
        Delete
      </SuperButton>
    ) : (
      <SuperButton onClick={onClickHandler}>Save</SuperButton>
    )

  return (
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
              Do you really want to remove this question?
              <React.Fragment>
                <br />
              </React.Fragment>
              <b>&#34;{question}&#34;</b>
            </Typography>
          ) : (
            <>
              <TextField
                id="standard-basic"
                label="Question"
                variant="standard"
                onChange={onChangeHandlerQuestion}
                style={{ marginBottom: 10 }}
                value={questionCard}
                error={error && questionCard === ''}
                helperText={error && questionCard === '' ? 'Please enter the question' : ' '}
              />
              <TextField
                id="standard-basic"
                label="Answer"
                variant="standard"
                onChange={onChangeHandlerAnswer}
                style={{ marginBottom: 10 }}
                value={answerCard}
                error={error && answerCard === ''}
                helperText={error && answerCard === '' ? 'Please enter the answer' : ' '}
              />
            </>
          )}
        </Box>
        <div className={s.buttonsBlock}>
          <SuperButton style={{ width: '40%' }} xType="secondary" onClick={handleClose}>
            Cancel
          </SuperButton>
          {button}
        </div>
      </div>
    </BasicModal>
  )
}
