import React, {useState} from 'react';
import './App.css';
import {SuperButton} from "./components/SuperButton";
import {SuperCheckbox} from "./components/SuperCheckbox/SuperCheckbox";
import {SuperInputText} from "./components/SuperInputText/SuperInputText";

function App() {

  const [checked, setChecked] = useState<boolean>(false)

  return (
    <div className="App" >
        <SuperButton>Default</SuperButton>
        <SuperButton xType={'red'}>Default</SuperButton>
        <SuperButton xType={'secondary'}>Default</SuperButton>
        <SuperButton disabled>Default</SuperButton>

        <SuperCheckbox checked={checked} onChangeChecked={setChecked}/>

        <SuperInputText/>
    </div>
  );
}

export default App;
