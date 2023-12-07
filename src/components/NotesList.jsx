import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function NotesList({ user, COLORS }) {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("notes")
      .where("userId", "==", user.uid)
      .onSnapshot((snapshot) => {
        setNotes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    return () => unsubscribe();
  }, [user]);

  const handleDeleteNote = async (noteId) => {
    try {
      const noteRef = firebase.firestore().collection("notes").doc(noteId);

      await noteRef.delete();

      console.log("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleViewMoreClick = (noteId) => {
    navigate(`/notes/${noteId}`);
  };

  return (
    <div className="m-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <h2 className="text-3xl font-bold mb-4 col-span-full">NOTES</h2>
      <button
        className="bg-green-600 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full col-span-full"
        onClick={() => navigate("/create")}
      >
        Create New Note
      </button>
      {notes.map((note) => (
        <div
          key={note.id}
          className="note-card border p-3 mb-5 mt-3 mx-5 bg-gray-200 border-black"
        >
          <h3 className="text-xl font-bold">Heading: {note.title}</h3>
          <p>
            Content: {note.body.slice(0, 20)}{" "}
            <span
              onClick={() => handleViewMoreClick(note.id)}
              className="text-blue-500 cursor-pointer"
            >
              ...view more
            </span>
          </p>
          <div
            className="flex items-center mt-2 w-16"
            style={{
              backgroundColor: note.color,
              padding: "3px",
              borderRadius: "22px",
            }}
          >
            <span className="text-white">{note.color}</span>
          </div>
          <button
            className="bg-red-600 hover:bg-red-400 text-white font-bold py-1 px-2 mt-2"
            onClick={() => handleDeleteNote(note.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

NotesList.propTypes = {
  user: PropTypes.object.isRequired,
  COLORS: PropTypes.array.isRequired,
};

export default NotesList;
