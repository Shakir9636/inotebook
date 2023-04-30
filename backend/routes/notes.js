const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");

//Route-1:Get All the Notes using:POST "/api/notes/fetchallnotes" Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
//Route-2:Add a new Note using:POST "/api/notes/addnote" Login Required
router.post( "/addnote", fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("discription", "Discription must be atleast 5 charater").isLength({min: 5}),
  ],
  async (req, res) => {
    // try {
      //if there are errors, return bad request and the errors
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      const {title, discription, tag} = req.body;
      const note =  new Note({
        title, discription, tag, user:req.user.id
      })
      const saveNote = await note.save();
      res.json(saveNote);
  // } catch (error) {
  //   res.status(500).send("Internal Server Error");
  // }
  }
);
//Route-3:Update and existing note using:PUT "/api/notes/updatenote" Login Required
router.put( "/updatenote/:id", fetchuser,
  async (req, res) => {
    try { 
      const {title, discription, tag} = req.body;
      //Create a newNote object
      const newNote =  {}
      if(title){newNote.title = title}
      if(discription){newNote.discription = discription}
      if(tag){newNote.tag = tag}
      //Find the note to be updated and update it
      let note = await Note.findById(req.params.id);
      if(!note){return res.status(400).send("Not Found");}
      if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
      }
      note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
      res.json(note);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
  }
);
//Route-4:Delete and existing note using:POST "/api/notes/deletenote" Login Required
router.delete( "/deletenote/:id", fetchuser,
  async (req, res) => {
    try { 
      //Find the note to be deleted and delete it
      let note = await Note.findById(req.params.id);
      if(!note){return res.status(400).send("Not Found");}
      //Allow deletion only if user owns this note
      if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed");}

      note = await Note.findByIdAndDelete(req.params.id)
      res.json({'Success':`This id : ${req.params.id} has been deleted`,note:note});
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
  }
);

module.exports = router;
