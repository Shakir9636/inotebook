import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import {useNavigate  } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes,updateNote } = context;
  let navigate = useNavigate()
  const [note,setNote] = useState({id:"",etitle:"",ediscription:"",etag:""});
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes()
    }else{
      navigate("/login")
    }
    // eslint-disable-next-line
  },[])
  const updateNotes = (currentNote)=>{
        ref.current.click()
        setNote({id:currentNote._id,etitle:currentNote.title,ediscription:currentNote.discription,etag:currentNote.tag})
        
  }
  const handleClick = (e)=>{
    e.preventDefault();
    const data = {
        id:note.id,
        title:note.etitle,
        discription:note.ediscription,
        tag:note.etag,
    }
    updateNote(data);
    refClose.current.click()
    props.showAlert("update Successfully",'success')
  }
  const onChange = (e)=>{
      setNote({...note, [e.target.name]:e.target.value})
  }
  const ref = useRef(null)
  const refClose = useRef(null)
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form className="my-3">
                    <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="etitle" onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="ediscription" className="form-label">Discription</label>
                    <input type="text" className="form-control" id="ediscription" name='ediscription' value={note.ediscription} onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange}/>
                    </div>
                </form>
                </div>
                <div className="modal-footer">
                    <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                </div>
                </div>
            </div>
        </div>
      <div className="row my-3r">
        <h2>Your Notes</h2>
        <div className='container'>
            {notes.length === 0 && "No Notes to display"}
        </div>
        {notes &&
          notes.map((note, i) => {
            return <Noteitem key={i} updateNotes={updateNotes} note={note} showAlert={props.showAlert}  />;
          })}
      </div>
    </>
  );
};

export default Notes;
