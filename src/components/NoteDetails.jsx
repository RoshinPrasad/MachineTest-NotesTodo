import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function NoteDetails({ user, COLORS }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [color, setColor] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        if (id) {
          const noteRef = firebase.firestore().collection("notes").doc(id);
          const noteData = await noteRef.get();

          if (noteData.exists) {
            const { title, body, color, createdAt } = noteData.data();

            setTitle(title);
            setBody(body);
            setColor(color);

            if (createdAt instanceof firebase.firestore.Timestamp) {
              setCreatedAt(createdAt.toDate().toLocaleString());
            } else {
              console.log("Invalid createdAt timestamp:", createdAt);
            }

            console.log("NoteData:", { title, body, color, createdAt });
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching note details:", error);
      }
    };

    fetchNoteDetails();
  }, [id]);

  return (
    <div className="mt-6 ml-2 border border-black p-6">
      <h1 className="font-bold text-3xl">View Details</h1>
      <br />
      <h1>Heading: {title}</h1>
      <p>Content: {body}</p>
      <p>Created At: {createdAt}</p>
      <div style={{ backgroundColor: color, padding: 5, borderRadius: 5 }}>
        Color: {color}
      </div>
      <br />
      <Link className="bg-gray-300 rounded-full ml-4 px-3 " to="/notes">
        Back to Notes List
      </Link>
    </div>
  );
}


NoteDetails.propTypes = {
  user: PropTypes.object.isRequired,
  COLORS: PropTypes.array.isRequired,
};

export default NoteDetails;
