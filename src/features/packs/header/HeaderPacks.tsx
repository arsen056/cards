import React from 'react';
import {MyOrAll} from "./myAllBtn/MyAll";
import {RangeSlider} from "./rangeSlider/RangeSlider";
import resetIcon from "../../../assets/reset.svg"
import s from './HeaderPacks.module.css'
import {SuperButton} from "../../../common/components/SuperButton";
import {AppDispatch} from "../../../app/store";
import {addPackTC, setPackName, setResetFilters} from "../packsReducer";
import {useSelector} from "react-redux";
import {selectStatus} from "../../../common/selectors";
import {Search} from "../../../common/components/search/Search";
import {searchParamsSelector} from "../selectors/selectMyPacks";


export const HeaderPacks = () => {
    const dispatch = AppDispatch()

    const isLoading = useSelector(selectStatus)
    const searchParams = useSelector(searchParamsSelector)

    const resetHandler = () => {
        dispatch(setResetFilters())
    }

    const addPack = () => {
        dispatch(addPackTC({cardsPack: {name: 'TEST PACK', private: false}}))
    }

    return (
        <div className={s.headerPacks}>
          {isLoading === 'loading' ? <div className={s.headerLock}></div> : undefined}
            <div className={s.headTitleButton}>
                <h2>Packs List</h2>
                <SuperButton onClick={addPack}>Add new pack</SuperButton>
            </div>
            <div className={s.wrapper}>

                <Search searchParams={searchParams} setNameAC={setPackName}/>
                <MyOrAll/>
                <RangeSlider/>
                <img className={s.reset} src={resetIcon} alt="reset" onClick={resetHandler}/>
            </div>

        </div>
    );
};
