import { NotesModel } from '../models/mNote.js';
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

export { router as notesRouter}