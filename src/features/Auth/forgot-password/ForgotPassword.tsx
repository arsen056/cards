import React from 'react'
import {Box} from "../../../common/components/box/Box";
import s from './ForgotPassword.module.css'
import {TextField} from "@mui/material";
import {SuperButton} from "../../../common/components/SuperButton";
import {Link, Navigate} from "react-router-dom";
import {useFormik} from "formik";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import {forgotPassword} from "./forgotReducer";
import {useSelector} from "react-redux";
import {Loader} from "../../../common/components/Loader/Loader";
import {AppStatusType} from "../../../app/appReducer";

export const ForgotPassword = () => {

  const dispatch = AppDispatch();
  const forgotStatus = useSelector<AppRootStateType, boolean>(state => state.forgot.forgotStatus)
  const appStatus = useSelector<AppRootStateType, AppStatusType>(state => state.app.status)

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: (values) => {
      const errors = {} as { email: string };

      if (!values.email) {
        errors.email = '';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    onSubmit: (values) => {
      dispatch(forgotPassword(values.email))
    },
  })

  if (!forgotStatus) {
    return <Navigate to={'/check-email'}/>
  }

  return (
    <form onSubmit={formik.handleSubmit} className={s.wrapper}>
      <Box title={appStatus === 'loading'? '' : 'Forgot your password?'}>
        {appStatus === 'loading' ? <Loader/>
          : <>
            <TextField
              name='email'
              fullWidth
              id="standard-basic"
              label="Email"
              variant="standard"
              error={!!formik.errors.email}
              value={formik.values.email}
              onChange={formik.handleChange}
              helperText={formik.errors.email}
            />
            <p>Enter your email address and we will send you further instructions </p>
            <SuperButton type='submit'>Send Instructions</SuperButton>
            <p>Did you remember your password?</p>
            <Link to='/login'>Try logging in</Link>
          </>
        }
      </Box>
    </form>
  )
}
