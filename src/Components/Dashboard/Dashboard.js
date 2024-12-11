import Parse from "parse";
import React, { useEffect, useState } from "react";
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
  //throwaway state var to load in user names
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    //get the matches for the current user
    const fetchMatches = async () => {
      const username = Parse.User.current()?.get("username");
      try {
        const matches = await getMatches(username);
        setMatches(matches);
        //For some reason, username of opponent will return null unless i do this chicanery
        //fetch match opponents
        matches?.forEach((match) => {
          match
            .get("black")
            .fetch()
            .then((b) => {
              if (b?.get("username") === Parse.User.current()?.get("username"))
                return;
            })
            .fetch()
            .then((b) => setUsers((u) => [...u, b.get("username")]));
        });
        matches?.forEach((match) => {
          match
            .get("red")
            .then((r) => {
              if (r?.get("username") === Parse.User.current()?.get("username"))
                return;
            })
            .fetch()
            .then((r) => setUsers((u) => [...u, r.get("username")]));
        });
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
        <h2 className="text-2xl font-bold">Your Games:</h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {matches?.map((match) => {
            return (
              <div key={match.id} className="flex flex-col items-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold pt-2 pb-4 px-4 rounded m-5 flex items-center justify-center flex-col"
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
