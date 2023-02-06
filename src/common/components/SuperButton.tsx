import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

import styled from 'styled-components'
import logoutIcon from '../../assets/icons/logout.svg'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperBtnStyledPropsType = DefaultButtonPropsType & {
  xType?: string
  fullWidth?: boolean
}

export const SuperButton: FC<any> = props => {
  return <Btn {...props} />
}

const Btn = styled.button<SuperBtnStyledPropsType>`
  position: relative;
  padding: 10px 40px;
  cursor: pointer;
  transition: 0.3s;
  font-size: 16px;
  font-weight: 500;
  border-radius: 30px;
  border: none;
  letter-spacing: 1.5px;
  
  ${props => props.fullWidth 
    ? `width: 100%` : ``}
  

  ${props =>
    props.disabled
      ? disabled
      : props.xType === 'logOut'
      ? logOut
      : props.xType === 'secondary'
      ? secondary
      : dflt}
`

const logOut = `
  background-color: transparent;  
  box-shadow: 0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3);
  padding-left: 53px;
  background-image: url(${logoutIcon});
  background-repeat: no-repeat;
  background-position: 30px 12px; 
  
    &:hover {
      color: #FFFFFF;    
      background-color: #366EFF;
    }
`

const secondary = `
    position: relative;
    background-color: transparent;
    background-size: 200% auto;
    border: 2px solid #0066CC;
    color: #0066CC;
    box-shadow: 0 0 20px rgb(0 0 0 / 10%);
    transition: .5s;
    
    &:hover {
      color: #0066CC;
      background-color: #E5F0FA;
      box-shadow: 0px 15px 20px rgb(46 229 157 / 40%);
      transform: translateY(-4px);
    }
    
    &:active {
      top: 2px;
      background-color: #006DDB;
    }
`

const dflt = `
    background-color: #0066CC;
    color: #FFF;
    box-shadow: 0px 8px 15px rgb(0 0 0 / 10%);
    
    &:hover {
      color: #DDEEFF;
      background-color: #006DDB;
      box-shadow: 0px 15px 20px rgb(46 229 157 / 40%);
      transform: translateY(-4px);
    }
    
    &:active {
      top: 2px;
    }
`

const disabled = `
  &:disabled {
    cursor: auto;
    background-color: #7DA3C8;
    color: #7A90A6;
  }
`
