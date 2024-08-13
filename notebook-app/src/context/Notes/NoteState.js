import React, { useState } from 'react'
import NoteContext from './noteContext'


const NoteState= (props) =>{
   const notesInitial=[
    {
      "_id": "66b207263c2cc4fd6705bc3b",
      "user": "66b205952fbf069a87992cb7",
      "title": "Title",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi laudantium magni vel soluta quo illo.",
      "tag": "Technology",
      "date": "2024-08-06T11:21:10.543Z",
      "__v": 0
    },
    {
      "_id": "66b360e0f3b33d6432bce0d9",
      "user": "66b205952fbf069a87992cb7",
      "title": "Title2",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi laudantium magni vel soluta quo illo.",
      "tag": "personal1",
      "date": "2024-08-07T11:56:16.998Z",
      "__v": 0
    },
    {
      "_id": "66b207263c2cc4fd6705bc3b",
      "user": "66b205952fbf069a87992cb7",
      "title": "Title",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi laudantium magni vel soluta quo illo.",
      "tag": "Technology",
      "date": "2024-08-06T11:21:10.543Z",
      "__v": 0
    },
    {
      "_id": "66b360e0f3b33d6432bce0d9",
      "user": "66b205952fbf069a87992cb7",
      "title": "Title2",
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi laudantium magni vel soluta quo illo.",
      "tag": "personal1",
      "date": "2024-08-07T11:56:16.998Z",
      "__v": 0
    }
  ]
  const [notes,setNotes]=useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;