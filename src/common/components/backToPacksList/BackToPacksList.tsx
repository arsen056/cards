import React from 'react'

import { Link } from 'react-router-dom'

import s from './BackToPacksList.module.css'

export const BackToPacksList = () => {
  return (
    <Link to={'/packs'}>
      <button className={s.back}>Back to Packs List</button>
    </Link>
  )
}
