import React, { FC, useState } from 'react'

import s from './Picture.module.css'

type Props = {
  deckCover: string
  defaultCover: string
}

export const Picture: FC<Props> = ({ deckCover, defaultCover }) => {
  const [isError, setIsError] = useState<boolean>(false)

  const errorPicture = () => setIsError(true)

  let picture = deckCover

  if (!picture) picture = defaultCover

  return (
    <div className={s.packCoverWrapper}>
      <img src={isError ? defaultCover : picture} alt="pack cover" onError={errorPicture} />
    </div>
  )
}
