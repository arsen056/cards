import React, {useEffect} from 'react'
import '../App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Error404 } from '../common/components/Error404'
import { ForgotPassword } from '../features/Auth/forgot-password/ForgotPassword'
import { NewPassword } from '../features/Auth/new-password/NewPassword'
import { SignIn } from '../features/Auth/sign-in/SignIn'
import { SignUp } from '../features/Auth/sign-up/SignUp'
import { Profile } from '../features/Profile/Profile'
import {Header} from "../common/components/header/Header";
import {CheckEmail} from "../features/Auth/forgot-password/CheckEmail";
import {AppDispatch, AppRootStateType} from "./store";
import {initializeAppTC} from "./appReducer";
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {LoaderBackDrop} from "../common/components/Loader/LoaderBackDrop";


function App() {
    const dispatch = AppDispatch()
  const isInit = useSelector<AppRootStateType, boolean>(state => state.app.isInit)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

  return ( isInit ?
    <div className="App">
      <Header/>
      <ErrorSnackbar/>
      <Routes>
        <Route path="/" element={<Navigate to={'/login'} />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/set-new-password/:token" element={<NewPassword />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="/*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
      : <LoaderBackDrop/>
  )
}

export default App
