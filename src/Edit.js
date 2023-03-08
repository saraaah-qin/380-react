import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function Edit({ notes, onDeleteNote, activeNote, editNote, edit, setEdit }) {
  const [value, setValue] = useState(activeNote.body);
  const [title, setTitle] = useState(activeNote.title);
  const [date, setDate] = useState(activeNote.date);

  const navigate = useNavigate();
  // const { id } = useParams();

  const savedNote = () => {
    activeNote.title = title;
    activeNote.body = value;
    activeNote.date = date;
    navigate(`/notes/` + activeNote.id);
  };

  if (!activeNote) {
    return <div className="no-notes"> Select a note, or create a new one</div>;
  }
  return (
    <div className="main-nav">
      <div className="note-edit">
        <div className="with-buttons">
          <div className="title-date">
            <input
              id="text-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="buttons">
            <button onClick={savedNote}>Save</button>
            <button onClick={() => onDeleteNote(activeNote.id)}>Delete</button>
          </div>
        </div>
      </div>
      <div className="quill-container">
        <ReactQuill
          className="quill-editor"
          theme="snow"
          placeholder="Your Note Here"
          value={value}
          onChange={setValue}
          readOnly={false}
        />
      </div>
    </div>
  );
}

export default Edit;
