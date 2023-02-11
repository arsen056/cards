import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {SignIn} from "../../features/auth/signIn/SignIn";
import {Profile} from "../../features/profile/Profile";
import {SignUp} from "../../features/auth/signUp/SignUp";
import {ForgotPassword} from "../../features/auth/forgotPassword/ForgotPassword";
import {CheckEmail} from "../../features/auth/forgotPassword/CheckEmail";
import {NewPassword} from "../../features/auth/newPassword/NewPassword";
import {Error404} from "../components/Error404";

import {PATHS} from "./PATHS";

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
    </Routes>
  );
};
