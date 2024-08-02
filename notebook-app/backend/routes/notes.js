const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//route 1: Get all the notes using :GET "/api//getuser". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error occured");
  }
});
//route 2: Add a new note using  :POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if there are errors , return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        user:req.user.id,
        title,
        description,
        tag,
      
      });
    //   console.log({user});
      const saveNote = await note.save();

      res.json({saveNote});
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal server error occured");
    }
  }
);

// route 3: update an existing note using PUT "/api/notes/updatenote". Login Required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const {title,description,tag}=req.body;
    try {
    //create a newnote object
    const newNote={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}


    //find the note to be updated and update it
    let note=await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")} // if notes not found
    
    if(note.user.toString() !== req.user.id){
      return res.status(404).send("Not Allowed")
    }
    note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error occured");
  }
})
//route 4: delete an existing note using DELETE "/api/notes/deletenote". Login Required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const {title,description,tag}=req.body;
  
try{
  //find the note to be deleted and deleted it
  let note=await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not found")}

  // Allow deletion only if the user owns this note
  if(note.user.toString() !== req.user.id){
    return res.status(404).send("Not Allowed")
  }
  note=await Notes.findByIdAndDelete(req.params.id)
  res.json({"Success":"Note has been deleted", note });
}
  catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error occured");
  }
}
)

module.exports = router;
