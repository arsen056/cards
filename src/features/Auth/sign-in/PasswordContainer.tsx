import React from 'react'
import { FieldInputProps } from 'formik/dist/types'
import s from './PasswordContainer.module.css'
import showPass from '../../../assets/eye.svg'
import {SuperInputText} from "../../../common/components/SuperInputText/SuperInputText";

type PasswordContainerType = FieldInputProps<string> & {
    placeholder?: string
}

export const PasswordContainer: React.FC<PasswordContainerType> = ({ ...restProps }) => {
    const [visiblePass, setVisiblePass] = React.useState(false)

    const visiblePassHandler = () => {
        setVisiblePass(visible => !visible)
    }

    return (
        <div className={s.passwordContainer}>
            <SuperInputText
                type={visiblePass ? 'text' : 'password'}
                placeholder={restProps.placeholder}
                {...restProps}
            />

            <div className={visiblePass ? s.active : s.showPass} onClick={visiblePassHandler}>
                <img src={showPass} alt="show password" />
            </div>
        </div>
    )
}