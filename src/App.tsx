import React, {useState} from 'react';
import './App.css';
import {SuperButton} from "./components/SuperButton";
import {SuperCheckbox} from "./components/SuperCheckbox/SuperCheckbox";
import {SuperInputText} from "./components/SuperInputText/SuperInputText";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import Error404 from "./components/Error404";
import {Recover} from "./components/Recover";
import {NewPassword} from "./components/NewPassword";
import {Profile} from "./components/Profile";

function App() {

  const [checked, setChecked] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('');
  const [values, setValues] = useState<string[]>([])
  const [error, setError] = useState<string>('')

  const onEnter = () => {
    setError('')
    if (inputValue.trim()) {
      setValues([...values, inputValue])
      setInputValue('')
      return
    }
    setError('Error')
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to={'/login'} />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/recover' element={<Recover/>}/>
        <Route path='/NewPassword' element={<NewPassword/>}/>

        <Route path='/404' element={<Error404/>}/>
        <Route path='/*' element={<Navigate to='/404'/>}/>
      </Routes>

      <div style={{padding: '2rem', display: 'inline-flex', columnGap: '2rem', justifyContent: 'center'}}>
        <SuperButton>Default</SuperButton>
        <SuperButton xType={'red'}>Default</SuperButton>
        <SuperButton xType={'secondary'}>Default</SuperButton>
        <SuperButton disabled>Default</SuperButton>

        <SuperCheckbox checked={checked} onChangeChecked={setChecked}>
          Checkbox
        </SuperCheckbox>
      </div>

      <SuperInputText placeholder='Input' error={error} value={inputValue} onChangeText={setInputValue} onEnter={onEnter}/>
      <div>
        {values.length ? values.map(e => <p>{e}</p>) : 'List empty'}
      </div>
    </div>
  );
}

export default App;
