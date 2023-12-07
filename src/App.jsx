import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";

import Signup from "./components/Signup";
import Login from "./components/Login";
import CreateNote from "./components/CreateNote";
import NoteDetails from "./components/NoteDetails";
import NotesList from "./components/NotesList";
import Landing from "./components/Landing";

const COLORS = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
];

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        {user ? (
          <>
            <div className="flex justify-between items-center bg-black text-white p-4">
              <div className="flex items-center">
                <PersonOutlineIcon className="mr-2" />
                <h1 className="text-xl font-bold">
                  {" "}
                  WELCOME,{" "}
                  {user.email && user.email.split("@")[0].toUpperCase()}
                </h1>
              </div>
              <div>
                {" "}
                <LogoutIcon />
                <LogoutButton />
              </div>
            </div>

            <Routes>
              <Route
                path="/notes"
                element={<NotesList user={user} COLORS={COLORS} />}
              />
              <Route
                path="/notes/:id"
                element={<NoteDetails user={user} COLORS={COLORS} />}
              />
              <Route
                path="/create"
                element={<CreateNote user={user} COLORS={COLORS} />}
              />
            </Routes>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    firebase.auth().signOut();
    navigate("/");
  };

  return (
    <button
      className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default App;
