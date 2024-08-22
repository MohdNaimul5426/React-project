import React, { useState } from "react";
import NoteContext from "./noteContext";
const host = "http://localhost:5000";

const NoteState = (props) => {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  
  //Get all notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMjA1OTUyZmJmMDY5YTg3OTkyY2I3In0sImlhdCI6MTcyMzAzMTcxNX0.b58k82b-P6hhb0YTVV14EVKFFBssstb3BHGfGY9RLJo",
      },
      
    });
    const json=await response.json();
    // console.log(json);
    setNotes(json)
    

    
  };

   //Add a note
   const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMjA1OTUyZmJmMDY5YTg3OTkyY2I3In0sImlhdCI6MTcyMzAzMTcxNX0.b58k82b-P6hhb0YTVV14EVKFFBssstb3BHGfGY9RLJo",
      },
      body: JSON.stringify( {title, description, tag}),
    });
    const note = await response.json();
     setNotes(notes.concat(note));
  };
  
  //Delete a note
  const deleteNote = async (id) => {

  // API call
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMjA1OTUyZmJmMDY5YTg3OTkyY2I3In0sImlhdCI6MTcyMzAzMTcxNX0.b58k82b-P6hhb0YTVV14EVKFFBssstb3BHGfGY9RLJo",
    },
    
  });
  const json = await response.json();
  
    // console.log("deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZiMjA1OTUyZmJmMDY5YTg3OTkyY2I3In0sImlhdCI6MTcyMzAzMTcxNX0.b58k82b-P6hhb0YTVV14EVKFFBssstb3BHGfGY9RLJo",
      },
      body: JSON.stringify( {title, description, tag}),
    });
    // const json = await response.json();
    // console.log(json);

    //for creating deep copy
    let newNotes=JSON.parse(JSON.stringify(notes))
    
    //Logic to edit in client
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
