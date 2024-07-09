import React , {useState} from 'react'
import Axios from 'axios'
import Dropdown from 'react-dropdown'


import './App.css';

function App() {
  return (
    <div className="App">
     <div className="heading">
      <h1>Currency converter</h1>
     </div>
     <div className="container">
      <div className="left">
        <h3>Amount</h3>
        <input type="text" placeholder='Enter the amount' />
      </div>
      <div className="middle">
        <h3>From</h3>
        <Dropdown />
      </div>
      <div className="switch"></div>
      <div className="right">
        <h3>To</h3>
        <Dropdown/>
      </div>
     </div>
     <div className="result">
      <button>Convert</button>
      <h2>Converted Amount:</h2>
      <p></p>
     </div>
    </div>
  );
}

export default App;
