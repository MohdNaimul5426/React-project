import React,{useState} from 'react'

import './App.css';
import Axios from 'axios'
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";


function App() {

  const [data,setData]=useState("")
  const [searchWord,setSearchWord]=useState("")


  const getMeaning=() =>{
    Axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
    ).then((res) => {
      setData(res.data[0]);
      // console.log(data);
    });
  }

  const playAudio=() =>{
    let audio=new Audio(data.phonetics[0].audio)
    audio.play();
  }
  return (
    <div className="App">
      <h1>Free Dictionary</h1>
      <div className="searchBox">
        <input type="text" placeholder="Search..."
        onChange={(e) =>{
         setSearchWord(e.target.value) 
        }}  />
        <button 
        onClick={() =>{
          getMeaning();
        }}>
          <FaSearch size="20px" />
        </button>
      </div>
     {data && ( <div className="showResults">
        <h2>
          {data.word}{" "}
          <button onClick={()=>playAudio()}>
            <FcSpeaker size="26px" />
          </button>
        </h2>
        <h4>Parts of speech:</h4>
        <p>{data.meanings[0].partOfSpeech}</p>
        <h4>Defination:</h4>
        <p>{data.meanings[0].definitions[0].definition}</p>
        

      </div>
      )}
    </div>
  );
}

export default App;

