import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react'
import styled from "styled-components";

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type SuperBtnStyledPropsType = DefaultButtonPropsType & {
    xType?: string
}

export const SuperButton:FC<any> = (props) => {
    return (
        <Btn {...props}/>
    )
}

const Btn = styled.button<SuperBtnStyledPropsType>`
  position: relative;
  padding: 10px 20px;
  cursor: pointer;
  transition: .3s;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  letter-spacing: 1.5px;
  background-color: red;
  
  ${props => props.disabled ? disabled : props.xType === 'red' ? red :
          props.xType === 'secondary' ? secondary : dflt}
`

const red = `
    background-color: #CC1439;
    color: #FFF;
    &:active {
      border-radius: 50px;
      box-shadow: 0 0 10px 0 #0066CC inset, 0 0 10px 4px #0066CC;
      color: #0066CC;
    }
    
    &:hover {
      background-color: transparent;
      color: #F137A6;
      box-shadow: 0 0 10px 0 #f137a6 inset, 0 0 10px 4px #f137a6;
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