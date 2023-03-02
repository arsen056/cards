import React from 'react'

import { Button } from '@mui/material'

import { AppDispatch } from 'app/store'
import { uploadPicture } from 'common/utils/uploadPicture'

type Props = {
  setImage: (image: string) => void
}

export const InputTypeFile = ({ setImage }: Props) => {
  const dispatch = AppDispatch()

  const uploadHandler = uploadPicture(setImage, dispatch)

  return (
    <label>
      <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
      <Button variant="text" component="span">
        Change cover
      </Button>
    </label>
  )
}
