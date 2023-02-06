import {ChangeEvent, FC, useState} from "react";
import s from './EditableSpan.module.css'
import {IconButton, InputAdornment, TextField} from "@mui/material";


type EditableSpanPropsType = {
  changeTitle: (title: string) => void
  title: string
}

export const EditableSpan: FC<EditableSpanPropsType> = ({title, changeTitle}) => {
  const [value, setValue] = useState<string>(title)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

  const changeEditMode = () => {
    changeTitle(value)
    setIsEdit(!isEdit)
  }

  return (!isEdit
      ? <div className={s.title}>
        <h3>{title}</h3>
        <span className={s.editIcon} onClick={changeEditMode}></span>
      </div>
      : <TextField
        fullWidth
        id="standard-basic"
        label='Nick name'
        value={value}
        onChange={onChange}
        variant="standard"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                disableRipple
                aria-label="toggle password visibility"
                onClick={() => {
                }}
                edge="end"

              >
                {<button className={s.save} onClick={changeEditMode}>SAVE</button>}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
  );
};
