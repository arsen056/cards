import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { PATHS } from './PATHS'

import { Error404 } from 'common/components/Error404'
import { CheckEmail } from 'features/auth/forgotPassword/CheckEmail'
import { ForgotPassword } from 'features/auth/forgotPassword/ForgotPassword'
import { NewPassword } from 'features/auth/newPassword/NewPassword'
import { SignIn } from 'features/auth/signIn/SignIn'
import { SignUp } from 'features/auth/signUp/SignUp'
import { Cards } from 'features/cards/Cards'
import { Learn } from 'features/learn/Learn'
import { Packs } from 'features/packs/Packs'
import { Profile } from 'features/profile/Profile'

export const RoutesPage = () => {
  return (
    <Routes>
      <Route path={PATHS.profile} element={<Profile />} />
      <Route path="/" element={<Navigate to={'/login'} />} />
      <Route path={PATHS.login} element={<SignIn />} />
      <Route path={PATHS.register} element={<SignUp />} />
      <Route path={PATHS.recovery} element={<ForgotPassword />} />
      <Route path={PATHS.checkEmail} element={<CheckEmail />} />
      <Route path={PATHS.newPassword} element={<NewPassword />} />
      <Route path={PATHS.notFound} element={<Error404 />} />
      <Route path={PATHS.unknown} element={<Navigate to="/404" />} />

      <Route path={PATHS.packs} element={<Packs />} />
      <Route path={PATHS.pack} element={<Cards />} />
      <Route path={PATHS.learn} element={<Learn />} />
    </Routes>
  )
}
