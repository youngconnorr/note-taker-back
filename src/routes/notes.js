import { NotesModel } from '../models/mNote.js';
import express from 'express';
import mongoose from 'mongoose';
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.get("/", async(req,res) => {    
    try {
        const response = await NotesModel.find({}); // goes through model finding what is requesting for response
        res.json(response)
    } catch(error) {
        res.json(error);
    }
})

router.post("/", async(req,res) => {
    const note = new NotesModel(req.body) //means that the new note will be the requests body
    
    try {
        const response = await note.save(); // goes through model finding what is requesting for response
        res.json(response)
    } catch(error) {
        res.json(error);
    }
})

router.put("/", async(req,res) => {
    try {
        const note = await NotesModel.findById(req.body.noteID) 
        const user = await UserModel.findById(req.body.userID)  //grabbing note id and user id, pushing note id into user id
        user.savedNotes.push(note);
        await user.save()
        res.json({savedRecipes: user.savedRecipes});

    } catch(error) {
        res.json(error);
    }
})

router.get("/saved-notes/ids", async(req,res) => {
    try {
        const user = await UserModel.findById(req.body.userID)
        res.json({savedNotes: user?.savedNotes})
    } catch (error) {
        res.json(error)
    }
})

router.get("/saved-notes", async(req,res) => {
    try {
        const user = await UserModel.findById(req.body.userID)
        const savedNotes = await NotesModel.find({ _id: { $in: user.savedNotes}}) // find notes where their id is inside of the users saved notes
        res.json({savedNotes: user?.savedNotes})
    } catch (error) {
        res.json(error)
    }
})




export { router as notesRouter}