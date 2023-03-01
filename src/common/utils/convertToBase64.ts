import { ChangeEvent } from 'react'

import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'

import { setError, setStatus } from '../../app/appReducer'
import { AppDispatch, AppRootStateType } from '../../app/store'

export const convertToBase64 = (file: File, callBack: (value: string) => void) => {
  const reader = new FileReader()

  reader.onloadend = () => {
    const file64 = reader.result as string

    callBack(file64)
  }
  reader.readAsDataURL(file)
}

export const onChangeImg = (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: ThunkDispatch<AppRootStateType, any, AnyAction>,
  callback: (img: string) => void
) => {
  if (e.target.files && e.target.files.length) {
    const file = e.target.files[0]
    const fileSizeMB = file.size / 1024 ** 2

    if (fileSizeMB < 1) {
      convertToBase64(file, (file64: string) => {
        callback(file64)
      })
    } else {
      dispatch(setError('The file is too large'))
      dispatch(setStatus('failed'))
    }
  }
}
