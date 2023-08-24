import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
    color: { type: String, required: true },
    name: { type: String, required: true, },
    content: { type: String, required: true },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
});

export const NotesModel = mongoose.model("notes", NotesSchema);