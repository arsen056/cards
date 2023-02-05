import React from 'react'
import '../App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Error404 } from '../common/components/Error404'
import { ForgotPassword } from '../features/Auth/forgot-password/ForgotPassword'
import { NewPassword } from '../features/Auth/new-password/NewPassword'
import { SignIn } from '../features/Auth/sign-in/SignIn'
import { SignUp } from '../features/Auth/sign-up/SignUp'
import { Profile } from '../features/Profile/Profile'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to={'/login'} />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/NewPassword" element={<NewPassword />} />

        <Route path="/404" element={<Error404 />} />
        <Route path="/*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  )
}

export default App
