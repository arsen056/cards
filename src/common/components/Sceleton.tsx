import React from 'react'

import { Skeleton } from '@mui/material'

export const SkeletonCustom = () => {
  return (
    <Skeleton variant="rectangular" width="413px" height="371px">
      <div style={{ paddingTop: '57%' }} />
    </Skeleton>
  )
}
