import { NotesModel } from '../models/mNote.js';
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get("/", async(req,res) => {    
    try {
        const response = await NotesModel.find({}); // goes through model finding what is requesting for response
        res.json(response)
    } catch(error) {
        res.json(err);
    }
})

router.post("/add", async(req,res) => {
    const note = new NotesModel(req.body) //means that the new note will be the requests body
    
    try {
        await note.save(); // goes through model finding what is requesting for response
        res.json(note)
    } catch(error) {
        res.json(err);
    }
})

export { router as notesRouter}