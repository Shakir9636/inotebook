import React,{useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext";

export default function AddNote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note,setNote] = useState({title:"",discription:"",tag:""});
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note);
        setNote({title:"",discription:"",tag:""})
        props.showAlert("Created Note Successfully",'success')
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <div>
      <h2>Add a Note</h2>
        <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="title" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="discription" className="form-label">Discription</label>
          <input type="text" className="form-control" id="discription" value={note.discription} name='discription' onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" value={note.tag} name='tag' onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}
