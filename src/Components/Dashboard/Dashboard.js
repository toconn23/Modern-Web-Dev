import Parse from "parse";
import React, { useState } from "react";
import Header from "../Common/Header.js";
import { createMatch, getUserByUsername } from "../../Services/Match.js";
import CreateGameForm from "./CreateGameForm.js";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedColor, setSelectedColor] = useState("r");

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    // set local user to selected color and opponent to opposite color
    let black = null;
    let red = null;
    if (selectedColor === "r") {
      black = await getUserByUsername(email);
      red = await getUserByUsername(Parse.User.current().get("username"));
    } else {
      black = await getUserByUsername(Parse.User.current().get("username"));
      red = await getUserByUsername(email);
    }
    if (!black || !red) {
      alert("User not found");
      return;
    }
    // reset email after submitting
    setEmail("");
    await createMatch(black, red);
    //hide form after submitting
    setShowForm(false);
  };

  return (
    <div>
      <Header />
      <div className="items-center justify-center flex">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5"
          onClick={handleButtonClick}
        >
          Make Game
        </button>
      </div>
      {showForm && (
        <CreateGameForm
          email={email}
          setEmail={setEmail}
          handleFormSubmit={handleFormSubmit}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
};

export default Dashboard;
