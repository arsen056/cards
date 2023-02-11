import React from 'react';
import {PackList} from "./packList/PackList";
import {SearchPacks} from "./searchPack/SearchPacks";
import {MyOrAll} from "./header/MyAll";

export const Packs = () => {
  return (
    <div className={'container pading-vertical'}>
      <SearchPacks/>
      <MyOrAll/>
      <PackList/>
    </div>
  );
};
