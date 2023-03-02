import * as React from 'react'
import { ChangeEvent, useState } from 'react'

import { Box, IconButton, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

import style from './CardsModal.module.css'

import { AppDispatch } from 'app/store'
import close from 'assets/close.svg'
import { InputTypeFile } from 'common/components/inputTypeFileCard/InputTypeFileCard'
import { BasicModal } from 'common/components/modals/BasicModal'
import { TypeButton } from 'common/components/modals/packModal/PackModal'
import s from 'common/components/modals/packModal/PackModal.module.css'
import { SuperButton } from 'common/components/SuperButton'
import SuperSelect from 'common/components/superSelect/SuperSelect'
import { setCardsCards } from 'features/cards/cardsReducer'

type Props = {
  cardModalFunctional: (
    question: string,
    answer: string,
    questionImg: string,
    answerImg: string
  ) => void
  typeButton: TypeButton
  titleButton?: string
  question?: string
  answer?: string
  packID?: string
  cardsLength?: number
}

type SelectQuestionType = 'text' | 'picture'

const selectOptions = [
  { id: 'text', value: 'Text' as SelectQuestionType },
  { id: 'picture', value: 'Picture' as SelectQuestionType },
]

export const CardModal = ({
  cardModalFunctional,
  typeButton,
  titleButton,
  answer,
  question,
  packID,
  cardsLength,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [questionCard, setQuestionCard] = useState<string>('')
  const [answerCard, setAnswerCard] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [typeQuestion, setTypeQuestion] = useState<SelectQuestionType>('text')
  const [imageQuestion, setImageQuestion] = useState<string>('')
  const [imageAnswer, setImageAnswer] = useState<string>('')

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
    setTypeQuestion('text')
    setImageQuestion('')
    setImageAnswer('')
  }

  const onChangeHandlerQuestion = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionCard(event.target.value)
  }
  const onChangeHandlerAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswerCard(event.target.value)
  }

  const onClickHandlerElseCondition = () => {
    cardModalFunctional(questionCard, answerCard, imageQuestion, imageAnswer)
    setError(false)
    setOpen(false)
  }

  const onClickHandler = () => {
    if (imageAnswer !== '' && imageQuestion !== '') onClickHandlerElseCondition()
    if (typeButton !== 'deleteIcon') {
      if (questionCard === '' || answerCard === '') setError(true)
      else onClickHandlerElseCondition()
    } else onClickHandlerElseCondition()
  }

  const onChangeOptionSelect = (value: SelectQuestionType) => {
    setTypeQuestion(value)
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
      cardsLength={cardsLength}
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
              <Typography id="modal-modal-description" style={{ opacity: 0.5, marginBottom: 5 }}>
                Choose a question format
              </Typography>
              <SuperSelect
                options={selectOptions}
                style={{ width: '100%' }}
                onChangeOption={onChangeOptionSelect}
              />
              {typeQuestion === 'text' ? (
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
              ) : (
                <div>
                  <div className={style.inputFileBlock}>
                    <Typography
                      id="modal-modal-description"
                      style={{ marginBottom: 5, fontWeight: 'bolder' }}
                      variant="subtitle1"
                    >
                      Question:
                    </Typography>
                    <InputTypeFile setImage={setImageQuestion} />
                  </div>
                  <div>
                    {imageQuestion && (
                      <img
                        src={imageQuestion}
                        style={{ width: '100%', borderRadius: 10, maxHeight: '30vh' }}
                        alt="image"
                      />
                    )}
                  </div>
                  <div className={style.inputFileBlock}>
                    <Typography
                      id="modal-modal-description"
                      style={{ marginBottom: 5, fontWeight: 'bolder' }}
                      variant="subtitle1"
                    >
                      Answer:
                    </Typography>
                    <InputTypeFile setImage={setImageAnswer} />
                  </div>
                  <div>
                    {imageAnswer && (
                      <img
                        src={imageAnswer}
                        style={{ width: '100%', borderRadius: 10, maxHeight: '30vh' }}
                        alt="image"
                      />
                    )}
                  </div>
                </div>
              )}
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
