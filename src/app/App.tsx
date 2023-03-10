import React, { useEffect } from 'react'

import '../index.css'
import { useSelector } from 'react-redux'

import { initializeAppTC } from './appReducer'
import { AppDispatch, AppRootStateType } from './store'

import { ErrorSnackbar } from 'common/components/errorSnackbar/ErrorSnackbar'
import { Header } from 'common/components/header/Header'
import { LoaderBackDrop } from 'common/components/loader/LoaderBackDrop'
import { RoutesPage } from 'common/routes/Routes'
import { selectStatus } from 'common/selectors'

function App() {
  const dispatch = AppDispatch()
  const isInit = useSelector<AppRootStateType, boolean>(state => state.app.isInit)
  const appStatus = useSelector(selectStatus)
  const loader = appStatus === 'loading' ? <LoaderBackDrop /> : null

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  return isInit ? (
    <div className="App">
      <Header />
      <ErrorSnackbar />
      <RoutesPage />
      {loader}
    </div>
  ) : (
    <LoaderBackDrop />
  )
}

export default App
