import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url("https://wallpapercave.com/wp/wp10297561.jpg")',
      }}
    >
      <div className="text-center text-white">
        <h1 className="font-bold text-3xl mb-8 text-black">
          Welcome to NotesToDo!
        </h1>
        <button
          className="bg-green-900 m-2 px-4 py-2 rounded-full text-white hover:bg-green-500"
          onClick={handleSignupClick}
        >
          Signup
        </button>
        <button
          className="bg-red-900 m-2 px-4 py-2 rounded-full text-white hover:bg-red-500"
          onClick={handleLoginClick}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Landing;
