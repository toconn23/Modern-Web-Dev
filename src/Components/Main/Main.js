import { useEffect, useState } from "react";
import { getAllStats } from "../../Services/Stats.js";
import MainEmailForm from "./MainEmailForm.js";
import MainList from "./MainList.js";
import MainDisplaySelect from "./MainDisplaySelect.js";
import MainGoIrish from "./MainGoIrish.js";

const Main = () => {
  // state used to fetch data
  const [stats, setStats] = useState([]);
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
    getAllStats()
      .then((stats) => {
        setStats(stats);
        console.log(stats);
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  return (
    <div>
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
