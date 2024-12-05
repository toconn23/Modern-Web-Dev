import Parse from "parse";
import React, { useMemo, useEffect, useState } from "react";
import Header from "../Common/Header.js";
import { useNavigate } from "react-router-dom";
import Board from "../Game/Board.js";
import {
  getMatches,
  createMatch,
  getUserByUsername,
} from "../../Services/Match.js";
import CreateGameForm from "./CreateGameForm.js";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedColor, setSelectedColor] = useState("r");
  const [matches, setMatches] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    //get the matches for the current user
    const fetchMatches = async () => {
      const username = Parse.User.current()?.get("username");
      try {
        setMatches(await getMatches(username));
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    // set local user to selected color and opponent to opposite color
    let black = null;
    let red = null;
    //check if idiot is trying to play against themselves
    if (email === Parse.User.current()?.get("username")) {
      alert("You cannot play against yourself dumbass");
      return;
    }
    if (selectedColor === "r") {
      black = await getUserByUsername(email);
      red = await getUserByUsername(Parse.User.current()?.get("username"));
    } else {
      black = await getUserByUsername(Parse.User.current()?.get("username"));
      red = await getUserByUsername(email);
    }
    if (!black || !red) {
      alert("User not found");
      return;
    }
    // reset email after submitting
    setEmail("");
    //update the matches with newly submitted match
    const newMatch = await createMatch(black, red);
    setMatches((prevMatches) => [...prevMatches, newMatch]);
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
      <div>
        <h2 className="text-2xl font-bold">Your Games</h2>
        <ul className="flex space-x-4">
          {matches?.map((match) => {
            return (
              <li key={match.id}>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5 flex items-center justify-center flex-col "
                  onClick={() => {
                    nav(`/game/${match.id}`);
                  }}
                >
                  {match.get("red").get("username")} vs{" "}
                  {match.get("black").get("username")}
                  <div className="justify-center items-center">
                    <Board id={match.id} minimized={true} />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
