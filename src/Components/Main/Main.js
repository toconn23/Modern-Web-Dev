import { useEffect, useState } from "react";
import { getGameStats } from "../../Services/Stats.js";
import { getAllGames } from "../../Services/Game.js";
import { getGameComments } from "../../Services/Comments.js";
import MainEmailForm from "./MainEmailForm.js";
import MainCommentForm from "./MainCommentForm.js";
import MainList from "./MainList.js";
import MainDisplaySelect from "./MainDisplaySelect.js";
import MainComments from "./MainComments.js";
import MainGoIrish from "./MainGoIrish.js";
import Header from "../Common/Header.js";

const Main = () => {
  // states used to store fetched data
  const [stats, setStats] = useState([]);
  const [games, setGames] = useState([]);
  const [comments, setComments] = useState([]);
  //set the header based on the selected game
  const [headerMessage, setHeaderMessage] = useState("Select a Game");
  //state for dropdown menu
  const [selectedGameId, setSelectedGameId] = useState("");
  // state to determine whether a stat should be displayed
  const [display, selectDisplay] = useState({
    firstDowns: true,
    totalYards: true,
    passingYards: true,
    rushingYards: true,
    turnovers: true,
    interceptionsThrown: false,
    fumblesLost: false,
    possession: false,
  });

  const [message, setMessage] = useState(
    "Generate some cool Notre Dame messages!"
  );

  useEffect(() => {
    //fetch the games for the dropdown menu
    getAllGames()
      .then((games) => {
        setGames(games);
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  const selectGame = async (e) => {
    e.preventDefault();
    if (selectedGameId) {
      console.log("Selected game:", selectedGameId);
      try {
        //retreive the stats and comments for the selected game
        const [statsData, commentsData] = await Promise.all([
          getGameStats(selectedGameId),
          getGameComments(selectedGameId),
        ]);
        //update the states with the fetched data
        setStats(statsData);
        setHeaderMessage(`${statsData[0].name} vs ${statsData[1].name}`);
        setComments(commentsData);
      } catch (err) {
        console.log("Error fetching stats:", err);
      }
    } else {
      //should never happen due to preventDefault
      console.log("Please select a game.");
    }
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <MainGoIrish message={message} setMessage={setMessage} />
      </div>
      <div>
        <h3>Select a game to see stats:</h3>
        <form onSubmit={selectGame}>
          <select
            value={selectedGameId}
            onChange={(e) => setSelectedGameId(e.target.value)}
          >
            <option value="" disabled>
              Select a game
            </option>
            {games.map((game) => (
              <option key={game.objectId} value={game.objectId}>
                {game.name}
              </option>
            ))}
          </select>
          <button type="submit">Get Stats</button>
        </form>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{headerMessage}</h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      ></div>
      <h3>Some of the key team stats are shown below:</h3>
      {stats && <MainList stats={stats} display={display} />}
      <MainDisplaySelect display={display} selectDisplay={selectDisplay} />
      <div style={{ margin: "10px" }}>
        <MainComments comments={comments} />
        <MainCommentForm />
      </div>
      <div>
        <h3>Interested in more stats? Sign up for our email list!</h3>
        {/* Dummy Email form component. Doesn't have state yet, but will in the future to support submit */}
        <MainEmailForm />
      </div>
    </div>
  );
};

export default Main;
