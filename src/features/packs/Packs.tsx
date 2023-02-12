import React from 'react';
import {PackList} from "./packList/PackList";
import {HeaderPacks} from "./header/HeaderPacks";

export const Packs = () => {
  return (
    <div className={'container pading-vertical'}>
      <HeaderPacks/>
      <PackList/>
    </div>
  );
};
