import { useEffect, useState } from "react";
import { getGameStats } from "../../Services/Stats.js";
import { getAllGames } from "../../Services/Game.js";
import MainEmailForm from "./MainEmailForm.js";
import MainList from "./MainList.js";
import MainDisplaySelect from "./MainDisplaySelect.js";
import MainGoIrish from "./MainGoIrish.js";

const Main = () => {
  // state used to fetch data
  const [stats, setStats] = useState([]);
  const [games, setGames] = useState([]);
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
    //fetch the data and update the state
    getAllGames()
      .then((games) => {
        setGames(games);
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  const selectGame = (e) => {
    e.preventDefault();
    if (selectedGameId) {
      getGameStats(selectedGameId)
        .then((stats) => {
          setStats(stats);
          console.log("Stats fetched for selected game:", stats);
        })
        .catch((err) => console.log("Error fetching stats:", err));
    } else {
      console.log("Please select a game.");
    }
  };

  return (
    <div>
      <div>
        <h3>Select a Game to Get More Stats:</h3>
        <form onSubmit={selectGame}>
          <select
            value={selectedGameId}
            onChange={(e) => setSelectedGameId(e.target.value)}
          >
            <option value="" disabled>
              Select a game
            </option>
            {games.map((game) => (
              <option key={game._id} value={game._id}>
                {game.name}
              </option>
            ))}
          </select>
          <button type="submit">Get Stats</button>
        </form>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Notre Dame vs Lousiville Breakdown</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <MainGoIrish message={message} setMessage={setMessage} />
      </div>
      <h3>Some of the key team stats are shown below:</h3>
      {stats && <MainList stats={stats} display={display} />}
      <MainDisplaySelect display={display} selectDisplay={selectDisplay} />
      <div>
        <h3>Interested in more stats? Sign up for our email list!</h3>
        {/* Dummy Email form component. Doesn't have state yet, but will in the future to support submit */}
        <MainEmailForm />
      </div>
    </div>
  );
};

export default Main;
