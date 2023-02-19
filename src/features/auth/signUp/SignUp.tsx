import React, {memo, useState} from 'react';
import {useFormik} from "formik";
import {useSelector} from "react-redux";
import {Navigate, NavLink} from "react-router-dom";
import {FormControl, FormGroup, Grid, InputAdornment, TextField} from "@mui/material";
import {SuperButton} from "common/components/SuperButton";
import {AppDispatch} from "app/store";
import {IconButton} from '@mui/material';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import s from './SignUp.module.css'
import {signUpTC} from "./signUpReducer";
import {Box} from "common/components/box/Box";
import {selectIsLoggedIn, selectSignUp} from "common/selectors";

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const SignUp = memo(() => {
    const dispatch = AppDispatch()
    const signUp = useSelector(selectSignUp)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const [password, setShowPassword] = useState<boolean>(true)
    const [confirmPassword, setConfirmPassword] = useState<boolean>(true)

    const showPassword = (p: string) => {
        p === 'password' ? setShowPassword(!password) : setConfirmPassword(!confirmPassword)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Email is required!'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Password is required!'
            } else if (values.password.length < 8) {
                errors.password = 'Password need to be more than 7 symbols'
            } else if (values.password !== values.confirmPassword && values.confirmPassword !== '') {
                errors.password = 'Please enter the same password for both fields.'
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Confirm password is required!'
            } else if (values.confirmPassword !== values.password && values.password !== '') {
                errors.confirmPassword = 'Please enter the same password for both fields.'
            }
            return errors
        },

        onSubmit: values => {
            const data = {
                email: values.email,
                password: values.password
            }
            dispatch(signUpTC(data))
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }
    if (signUp) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.wrapper}>
            <Box title={'Sign Up'}>
                <Grid container justifyContent={'center'}>
                    <Grid item justifyContent={'center'} marginTop={5}>
                        <form onSubmit={formik.handleSubmit} className={s.form}>
                            <FormControl className={s.formControl}>
                                <FormGroup>
                                    <TextField
                                        sx={{m: 1, width: '347px'}}
                                        variant="standard"
                                        label="Email"
                                        margin="normal"
                                        {...formik.getFieldProps("email")}
                                        error={!!formik.errors.email && formik.touched.email}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ' '}
                                    />
                                    <FormControl variant="standard" sx={{m: 1, width: '347px'}}>
                                        <TextField
                                            id="standard-password-input"
                                            label="Password"
                                            type={password ? 'password' : 'text'}
                                            autoComplete="password"
                                            variant="standard"
                                            {...formik.getFieldProps("password")}
                                            error={!!formik.errors.password && formik.touched.password}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                            helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ' '}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            id="password"
                                                            aria-label="toggle password visibility"
                                                            onClick={(e) => showPassword(e.currentTarget.id)}
                                                        >
                                                            {password ? <Visibility/> : <VisibilityOff/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </FormControl>
                                    <FormControl variant="standard" sx={{m: 1, width: '347px'}}>
                                        <TextField
                                            id="standard-confirmPassword-input"
                                            label="Confirm Password"
                                            type={confirmPassword ? 'password' : 'text'}
                                            autoComplete="current-password"
                                            variant="standard"
                                            {...formik.getFieldProps("confirmPassword")}
                                            error={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.confirmPassword}
                                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ' '}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            id="confirmPassword"
                                                            aria-label="toggle conf-password visibility"
                                                            onClick={(e) => showPassword(e.currentTarget.id)}
                                                        >
                                                            {confirmPassword ? <Visibility/> : <VisibilityOff/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </FormControl>
                                    <SuperButton type={'submit'} variant={'contained'} color={'primary'}
                                                 style={{marginTop: 50}}>
                                        Sign Up
                                    </SuperButton>
                                </FormGroup>
                            </FormControl>
                        </form>
                        <div className={s.signInBlock}>
                            <p>Already have an account?</p>
                            <NavLink to="/login" className={s.signInLink}>Sign In</NavLink>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
})
