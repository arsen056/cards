import {Skeleton} from "@mui/material";

import React from 'react';

export const SkeletonCustom = () => {
  return (
    <Skeleton variant="rectangular" width="413px" height='371px'>
      <div style={{ paddingTop: '57%' }} />
    </Skeleton>
  );
};
