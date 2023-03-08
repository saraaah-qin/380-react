import { useNavigate, useParams } from "react-router-dom";

function Sidebar({ notes, onAddNote, activeNote, setActiveNote }) {
  const navigate = useNavigate();
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
    <div className="notes-sidebar">
      <div className="notes-menu">
        <h1>Notes </h1>
        <button className="add" onClick={onAddNote}>
          +
        </button>
      </div>
      <div className="notes-lists">
        {notes.map((note) => (
          <div
            className={`notes-list ${
              note.id === activeNote && "notes-list active"
            }`}
            onClick={() => {
              setActiveNote(note.id);
              navigate(`/notes/` + note.id);
            }}
          >
            <div className="notes-title">
              <p id="note-title">
                <strong>{note.title}</strong>
              </p>
              <p id="date-style">{formatDate(note.date)}</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: note.body.slice(0, 100) + "...",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
