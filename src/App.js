import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import uuid from "react-uuid";
import Edit from "./Edit";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import View from "./View";

function App({ state }) {
  const [isVisible, setIsVisible] = useState(true);
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [edit, setEdit] = useState(
    localStorage.edit ? JSON.parse(localStorage.edit) : []
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("edits", JSON.stringify(edit));
  }, [edit]);

  const navigate = useNavigate();

  const { id } = useParams();

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled",
      date: "",
      body: "",
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
    navigate(`/notes/` + newNote.id + `/edit`);
  };

  const onDeleteNote = (deleteID) => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      setNotes(notes.filter((note) => note.id !== deleteID));
    }
    navigate(`/`);
  };

  /* get the current note */
  const [activeNote, setActiveNote] = useState(
    localStorage.activeNote ? JSON.parse(localStorage.activeNote) : []
  );

  useEffect(() => {
    localStorage.setItem("activeNote", JSON.stringify(activeNote));
  }, [activeNote]);

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const editNote = (updatedNote) => {
    const updatedNotesList = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }
      return note;
    });

    setNotes(updatedNotesList);
  };

  if (state === "view" || state === "none") {
    return (
      <div className="main">
        <div className="header-header">
          <Nav setIsVisible={setIsVisible} isVisible={isVisible} />
        </div>

        <div className="App">
          {isVisible && (
            <Sidebar
              notes={notes}
              onAddNote={onAddNote}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
            />
          )}

          <View
            notes={notes}
            edit={edit}
            setEdit={setEdit}
            onDeleteNote={onDeleteNote}
            activeNote={getActiveNote()}
            editNote={editNote}
          />
        </div>
      </div>
    );
  } else if ((state = "edit")) {
    return (
      <div className="main">
        <div className="header-header">
          <Nav setIsVisible={setIsVisible} isVisible={isVisible} />
        </div>

        <div className="App">
          {isVisible && (
            <Sidebar
              notes={notes}
              onAddNote={onAddNote}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
            />
          )}

          <Edit
            notes={notes}
            edit={edit}
            setEdit={setEdit}
            onDeleteNote={onDeleteNote}
            activeNote={getActiveNote()}
            editNote={editNote}
          />
        </div>
      </div>
    );
  }
}

export default App;
