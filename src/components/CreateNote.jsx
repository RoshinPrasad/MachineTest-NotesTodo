import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function CreateNote({ user, COLORS }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const navigate = useNavigate();

  const handleCreateNote = async () => {
    try {
      const notesCollection = firebase.firestore().collection("notes");

      await notesCollection.add({
        title,
        body,
        color,
        userId: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      console.log("Note created successfully");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateNote();
    navigate("/notes");
  };

  const goback = () => {
    navigate("/notes");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold m-3">Create Note</h1>
      <form className="border border-black p-6" onSubmit={handleSubmit}>
        <label className="block">Title:</label>
        <input
          className="block border border-black my-3 w-full p-2 rounded-md"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label className="block mt-6">Body:</label>
        <textarea
          className="block border border-black my-3 w-full p-2 rounded-md"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="2"
          required
        />
        <label className="block mt-6">Color:</label>
        <select
          className="block border border-black my-3 w-full p-2 rounded-md"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        >
          {COLORS.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
        <button
          className="mt-6 bg-green-500 rounded-full px-3 py-2 text-white"
          type="submit"
        >
          Create Note
        </button>
        <h1 className="underline m-2 cursor-pointer" onClick={goback}>
          Go Back ...
        </h1>
      </form>
    </div>
  );
}

CreateNote.propTypes = {
  user: PropTypes.object.isRequired,
  COLORS: PropTypes.array.isRequired,
};

export default CreateNote;
