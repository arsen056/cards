import React, {useState} from 'react';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, NavLink} from "react-router-dom";
import {FormControl, FormGroup, Grid, Input, InputAdornment, InputLabel, TextField} from "@mui/material";
import {SuperButton} from "../../../common/components/SuperButton";
import {AppRootStateType} from "../../../app/store";
import {IconButton} from '@mui/material';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import s from './SignUp.module.css'
import {signUpTC} from "./signUp-reducer";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";


type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const SignUp = () => {
    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, any, AnyAction>>()
    const signUp = useSelector<AppRootStateType>(state => state.signUp.signUp)
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
            } else if (values.password.length < 3) {
                errors.password = 'Password need to be more than 3 symbols'
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Confirm password is required!'
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Check your password!'
            }
            return errors
        },

        onSubmit: values => {
            const data = {
                email: values.email,
                password: values.password
            }
            dispatch(signUpTC(data))
            formik.resetForm()
        },
        })

    if (signUp) {
        return <Navigate to={'/profile'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'} marginTop={5}>
            <div className={s.title}>
                <h1>Sign Up</h1>
            </div>
            <form onSubmit={formik.handleSubmit} className={s.form}>
                <FormControl className={s.formControl}>
                    <FormGroup>
                        <TextField
                            variant="standard"
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : ''}
                        <FormControl variant="standard" style={{marginTop: 15}}>
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="input-password"
                                type={password ? 'password' : 'text'}
                                {...formik.getFieldProps("password")}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            id="password"
                                            aria-label="toggle password visibility"
                                            onClick={(e) => showPassword(e.currentTarget.id)}
                                        >
                                            {password ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {formik.errors.password ? <div style={{color: "red"}}>{formik.errors.password}</div> : ''}
                        <FormControl variant="standard" style={{marginTop: 25}}>
                            <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                            <Input
                                id="input-confirmPassword"
                                type={confirmPassword ? 'password' : 'text'}
                                {...formik.getFieldProps("confirmPassword")}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            id="confirmPassword"
                                            aria-label="toggle password visibility"
                                            onClick={(e) => showPassword(e.currentTarget.id)}
                                        >
                                            {confirmPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {formik.errors.confirmPassword ?
                            <div style={{color: "red"}}>{formik.errors.confirmPassword}</div> : ''}
                        <SuperButton type={'submit'} variant={'contained'} color={'primary'} style={{marginTop: 50}}>
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
}
