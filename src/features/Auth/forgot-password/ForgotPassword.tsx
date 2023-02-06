import React from 'react'
import {Box} from "../../../common/components/box/Box";
import s from './ForgotPassword.module.css'
import {TextField} from "@mui/material";
import {SuperButton} from "../../../common/components/SuperButton";
import {Link} from "react-router-dom";
import {useFormik} from "formik";

export const ForgotPassword = () => {

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
      alert(JSON.stringify(values, null, 2));
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className={s.wrapper}>
      <Box title='Forgot your password?'>
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

      </Box>
    </form>
  )
}
