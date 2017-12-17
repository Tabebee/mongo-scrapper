const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteScehma = new Schema({
    title: String,
    body: String
});

const Note = mongoose.modal("Notes", NoteScehma);

module.exports = Note;


