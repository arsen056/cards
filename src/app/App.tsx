import React, {useEffect} from 'react'
import '../App.css'
import {Header} from "../common/components/header/Header";
import {AppDispatch, AppRootStateType} from "./store";
import {initializeAppTC} from "./appReducer";
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {LoaderBackDrop} from "../common/components/Loader/LoaderBackDrop";
import {RoutesPage} from "../common/routes/Routes";


function App() {
  const dispatch = AppDispatch()
  const isInit = useSelector<AppRootStateType, boolean>(state => state.app.isInit)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  return (isInit ?
      <div className="App">
        <Header/>
        <ErrorSnackbar/>
        <RoutesPage/>
      </div>
      : <LoaderBackDrop/>
  )
}

export default App
