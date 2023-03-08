import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

function View({ notes, onDeleteNote, activeNote, editNote, edit, setEdit }) {
  //   const { id } = useParams();
  const navigate = useNavigate();
  if (!activeNote) {
    return <div className="no-notes"> Select a note, or create a new one</div>;
  }

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
      return "";
    }
    return formatted;
  };

  return (
    <div className="main-nav">
      <div className="note-edit">
        <div className="with-buttons">
          <div className="title-date">
            <input id="text-title" type="text" value={activeNote.title} />
            <p> {formatDate(activeNote.date)} </p>
          </div>
          <div className="buttons">
            <button
              onClick={() => {
                navigate(`/notes/` + activeNote.id + `/edit`);
              }}
            >
              Edit
            </button>
            <button onClick={() => onDeleteNote(activeNote.id)}>Delete</button>
          </div>
        </div>
      </div>
      <div className="quill-container">
        <ReactQuill
          className="quill-editor"
          theme="snow"
          id="toolbar"
          value={activeNote.body}
          readOnly={true}
        />
      </div>
    </div>
  );
}
export default View;
