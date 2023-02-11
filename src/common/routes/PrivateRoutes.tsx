import { Navigate, Outlet } from 'react-router-dom'
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../selectors";
export const PrivateRoutes = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  return (
    isLoggedIn ? <Outlet/> : <Navigate to='/login'/>
  )
}