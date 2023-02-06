import React from 'react';
import {Box} from "../../../common/components/box/Box";
import {Link} from "react-router-dom";
import s from './ForgotPassword.module.css'
import {setForgotStatus} from "./forgotReducer";
import {AppDispatch} from "../../../app/store";

export const CheckEmail = () => {
  const dispatch = AppDispatch();
  dispatch(setForgotStatus(false))

  return (
    <div className={s.wrapper}>
      <Box title={'Check email'} >
        <Link to={'/login'}><button>Back to login</button></Link>
      </Box>
    </div>
  );
};
