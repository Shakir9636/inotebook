import { useState } from "react";
import NoteContext from "./noteContext";

const NoteStete = (props)=>{
    const host = 'http://localhost:5000';
    const notesInitial = []
    const [notes,setNotes] = useState(notesInitial)

    // Get all Note
    const getNotes = async ()=>{
        //API Call
        const response = await fetch("http://localhost:5000/api/notes/fetchallnotes", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'auth-token': localStorage.getItem('token')
            },
          });
          const json = await response.json();
          setNotes(json)
    }
    
    // Add a Note
    const addNote = async (data)=>{
        const {title, discription, tag} = data
        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, discription, tag})
          });
          const note = await response.json()
          setNotes(notes.concat(note))
    }
    // Update a Note
    const updateNote = async (data)=>{
        const {id,title, discription, tag} = data
        //API Call
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, discription, tag})
        });
        const newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            if(newNotes[index]._id === id){
                newNotes[index].title = title
                newNotes[index].discription = discription
                newNotes[index].tag = tag
                break;
            }
        }
        setNotes(newNotes)
    }
    // Delete a Note
    const deleteNote = async (id)=>{
        //API Call
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              'auth-token': localStorage.getItem('token')
            },
          });
        const newNote = notes.filter((note)=>{return note._id !== id})
        setNotes(newNote)
    }
    return (
        <NoteContext.Provider value={{notes,addNote,updateNote,deleteNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteStete;