const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteScehma = new Schema({
    title: String,
    body: String
});

const Notes = mongoose.model("Notes", NoteScehma);

module.exports = Notes;


