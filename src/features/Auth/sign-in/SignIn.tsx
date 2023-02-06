import {useFormik} from 'formik'
import {Navigate, NavLink} from 'react-router-dom'

import React from 'react'
import s from './Login.module.css'
import {useDispatch, useSelector} from 'react-redux'

import {PasswordContainer} from "./PasswordContainer";
import {AppRootStateType} from "../../../app/store";
import {SuperCheckbox} from "../../../common/components/SuperCheckbox/SuperCheckbox";
import {SuperButton} from "../../../common/components/SuperButton";
import {SuperInputText} from "../../../common/components/SuperInputText/SuperInputText";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const SignIn = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: values => {
            const errors: FormikErrorType = {}

            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (values.password.length < 9) {
                errors.password = 'Password should be more 8 letters'
            }

            return errors
        },
        onSubmit: values => {
            // dispatch(loginTC(values))
            formik.resetForm() //зачистить поле
        },
    })
    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={s.signInContainer}>
            <div className={s.page}>
                <h3 className={s.h1}>Sign in</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.field}>
                        <label className={formik.touched.email && formik.errors.email ? s.errorField : ''}>
                            Email
                            <SuperInputText type={'text'} {...formik.getFieldProps('email')} />
                            <div
                                className={s.error}>{formik.touched.email && formik.errors.email && formik.errors.email}</div>
                        </label>
                    </div>
                    <div className={s.field}>
                        <label className={formik.touched.password && formik.errors.password ? s.errorField : ''}>
                            Password
                            <PasswordContainer {...formik.getFieldProps('password')} />
                            <div
                                className={s.error}>{formik.touched.password && formik.errors.password && formik.errors.password}</div>
                        </label>
                    </div>
                    <div className={s.checkboxField}>
                        <SuperCheckbox {...formik.getFieldProps('rememberMe')}>Remember me</SuperCheckbox>
                    </div>

                    <p className={s.passRecovery}>
                        <NavLink to="/recoveryPassword">Forgot Password?</NavLink>
                    </p>
                    <div className={s.sendBtn}>
                        <SuperButton xType={'default'} type="submit">
                            Sign in
                        </SuperButton>
                    </div>
                </form>
                <p className={s.question}>Already have an account?</p>
                <NavLink to="/signUp" className={s.link}>Sign Up</NavLink>
            </div>

        </div>
    )
}

