import React from 'react'

import { useSelector } from 'react-redux'

import { addPackTC, setPackName, setResetFilters } from '../packsReducer'
import { searchParamsSelector, selectMaxCardsCount } from '../selectors'

import s from './HeaderPacks.module.css'
import { MyOrAll } from './myAllBtn/MyAll'
import { RangeSlider } from './rangeSlider/RangeSlider'

import { AppDispatch } from 'app/store'
import resetIcon from 'assets/reset.svg'
import { Search } from 'common/components/search/Search'
import { PackModal } from 'features/modal/packModal/PackModal'

export const HeaderPacks = () => {
  const dispatch = AppDispatch()

  const searchParams = useSelector(searchParamsSelector)
  const maxValue = useSelector(selectMaxCardsCount)

  const resetHandler = () => {
    dispatch(setResetFilters(maxValue))
  }

  const addPack = (namePack: string, statusPrivate: boolean) => {
    dispatch(addPackTC({ cardsPack: { name: namePack, private: statusPrivate } }))
  }

  return (
    <div className={s.headerPacks}>
      <div className={s.headTitleButton}>
        <h2>Packs List</h2>
        <PackModal
          typeButton={'superButton'}
          packModalFunctional={addPack}
          titleButton={'Add new pack'}
        />
      </div>
      <div className={s.wrapper}>
        <Search searchParams={searchParams} setNameAC={setPackName} />
        <MyOrAll />
        <RangeSlider />
        <img className={s.reset} src={resetIcon} alt="reset" onClick={resetHandler} />
      </div>
    </div>
  )
}
