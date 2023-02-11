import React from 'react';
import s from './NewPassword.module.css'
import {Box} from "../../../common/components/box/Box";
import {FormControl, IconButton, Input, InputAdornment, InputLabel} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {SuperButton} from "../../../common/components/SuperButton";
import {useFormik} from "formik";
import {AppDispatch} from "../../../app/store";
import {newPasswordThunk} from "./newPasswordThunk";
import {Navigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {Loader} from "../../../common/components/loader/Loader";
import {selectForgotStatus, selectStatus} from "../../../common/selectors";

export const NewPassword = () => {
  const dispatch = AppDispatch();
  const {token} = useParams<{token: string}>();

  const forgotStatus = useSelector(selectForgotStatus)
  const appStatus = useSelector(selectStatus)

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validate: (values) => {
      const errors = {} as { password: string };

      if (!values.password) {
        errors.password = '';
      } else if (values.password.length < 7) {
        errors.password = 'Password must be more than 7 characters long';
      }
      return errors;
    },
    onSubmit: (values) => {
      if (token) dispatch(newPasswordThunk(values.password, token))
    },
  })

  if (forgotStatus) {
    return <Navigate to='/login'/>
  }

  return (
    <form className={s.wrapper} onSubmit={formik.handleSubmit}>
      <Box title={appStatus === 'loading'? '' : 'Create new password'}>
        {appStatus === 'loading' ? <Loader/> :
          <>
            <FormControl fullWidth sx={{ m: 1,}} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                error={!!formik.errors.password}

                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <p>Create new password and we will send you further instructions to email</p>
            <SuperButton type='submit'>Create new password</SuperButton>
          </>}
      </Box>
    </form>
  );
};
