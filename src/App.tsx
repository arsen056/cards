import React from 'react';
import './App.css';
import {SuperButton} from "./components/SuperButton";

function App() {
  return (
    <div className="App" >
        <SuperButton>Default</SuperButton>
        <SuperButton xType={'red'}>Default</SuperButton>
        <SuperButton xType={'secondary'}>Default</SuperButton>
        <SuperButton disabled>Default</SuperButton>
    </div>
  );
}

export default App;
