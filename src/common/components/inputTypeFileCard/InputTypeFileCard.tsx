import React, { ChangeEvent, useState } from 'react'

import { Button } from '@mui/material'

import { convertFileToBase64 } from 'common/utils/convertFileToBase64'

export const InputTypeFile = () => {
  const [image, setImage] = useState<undefined | string>(undefined)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      convertFileToBase64(file, (file64: string) => {
        setImage(file64)
      })
    }
  }

  return (
    <label>
      <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
      <Button variant="text" component="span">
        Change cover
      </Button>
      {image && <img src={image} style={{ width: '300px', height: 300 }} alt="image" />}
    </label>
  )
}
