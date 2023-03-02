import { ChangeEvent } from 'react'

import { setError } from 'app/appReducer'
import { AppDispatchType } from 'app/store'
import { convertFileToBase64 } from 'common/utils/convertFileToBase64'

export const uploadPicture =
  (setPicture: (pic: string) => void, dispatch: AppDispatchType) =>
  (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setPicture(file64)
        })
      } else {
        dispatch(setError(`The file is too large`))
      }
    }
  }
