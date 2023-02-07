import React, {useState} from 'react'
import {FieldInputProps} from 'formik/dist/types'
import {FormControl, IconButton, Input, InputAdornment, InputLabel} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {SuperInputText} from "../../../common/components/SuperInputText/SuperInputText";

type PasswordContainerType = FieldInputProps<string> & {
    placeholder?: string
}

export const PasswordContainer: React.FC<PasswordContainerType> = ({ ...restProps }) => {
    const [password, setShowPassword] = useState<boolean>(true)

    const showPassword = () => {
        setShowPassword(visible => !visible)
    }

    return (
        <FormControl  sx={{ m: 1, width: '347px' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
                id="show-password"
                type={password ? 'password' : 'text'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            id="password"
                            aria-label="toggle password visibility"
                            onClick={showPassword}
                        >
                            {password ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>

                }
            />
        </FormControl>
    )
}