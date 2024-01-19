const express = require("express");
const cors = require('cors');
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
app.use(cors()); 
app.use(bodyParser.json());

/* ---------------------------------------------------------------- */

// read JSON file
function getNotes() {
    const data = fs.readFileSync("./notes.json", "utf8");
    return JSON.parse(data);
}

// write or update or delete info in database (JSON)
function writeNotes(notes) {
    fs.writeFileSync("./notes.json", JSON.stringify(notes), "utf8");
}

/* ---------------------------------------------------------------- */

// output all comments
app.get("/notes", (req, res) => {
    const notes = getNotes();
    res.send(notes);
});

// find comment
app.get("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const notes = getComments();
    const note = notes.find((note) => note.id === id);
    res.send(note);
});

// add
app.post("/notes", (req, res) => {
    const newNote = req.body;
    const notes = getNotes();
    const lastId = notes.length > 0 ? notes[notes.length - 1].id : 0;
    const newId = lastId + 1;
    notes.push({
        id: newId,
        title: newNote.title,
        text: newNote.text
    });
    writeNotes(notes);
    res.send({ message: "Successfully added note", note: { ...newNote, id: newId } });
});

// update
app.put("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const newNote = req.body;
    const notes = getNotes();
    const index = notes.findIndex((note) => note.id === id);
    notes[index] = { ...notes[index], ...newNote };
    writeNotes(notes);
    res.send({ message: "Successfully updated note", notes });
});

// delete
app.delete("/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let notes = getNotes();
    const index = notes.findIndex((note) => note.id === id);
    notes.splice(index, 1);
    writeNotes(notes);
    res.send({ message: "Successfully deleted note", notes });
});

/* ---------------------------------------------------------------- */

// check if server started
app.listen(3000, () => {
    console.log("http://localhost:3000/");
});

/* ---------------------------------------------------------------- */