import { ChangeEvent, FC, useState } from 'react'

import { InputAdornment, TextField } from '@mui/material'

import s from './EditableSpan.module.css'

type EditableSpanPropsType = {
  changeTitle: (title: string) => void
  title: string
}

export const EditableSpan: FC<EditableSpanPropsType> = ({ title, changeTitle }) => {
  const [value, setValue] = useState<string>(title)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [helpText, setHelpText] = useState<string>('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value

    if (!name) {
      setHelpText('Name is required')
    } else {
      setHelpText('')
    }
    setValue(name)
  }

  const changeEditMode = () => {
    changeTitle(value)
    setIsEdit(!isEdit)
  }

  return !isEdit ? (
    <div className={s.title}>
      <h3>{title}</h3>
      <span className={s.editIcon} onClick={changeEditMode}></span>
    </div>
  ) : (
    <TextField
      fullWidth
      id="standard-basic"
      label="Nick name"
      value={value}
      onChange={onChange}
      variant="standard"
      error={!!helpText}
      helperText={helpText || ' '}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <button className={s.save} disabled={!!helpText} onClick={changeEditMode}>
              SAVE
            </button>
          </InputAdornment>
        ),
      }}
    />
  )
}
