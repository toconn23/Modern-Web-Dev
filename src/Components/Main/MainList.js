import React from "react";

const MainList = ({ stats, display }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {stats.map((stat, index) => (
        <div key={index} style={{ height: "250px", margin: "auto" }}>
          <h2>
            {stat.name}: {stat.score}
          </h2>
          {display.firstDowns && <li>First Downs: {stat.firstDowns}</li>}
          {display.totalYards && <li>Total Yards: {stat.totalYards}</li>}
          {display.passingYards && <li>Passing Yards: {stat.passingYards}</li>}
          {display.rushingYards && <li>Rushing Yards: {stat.rushingYards}</li>}
          {display.turnovers && <li>Turnovers: {stat.turnovers}</li>}
          {display.interceptionsThrown && (
            <li>Interceptions Thrown: {stat.interceptionsThrown}</li>
          )}
          {display.fumblesLost && <li>Fumbles Lost: {stat.fumblesLost}</li>}
          {display.possession && <li>Possession: {stat.possession}</li>}
        </div>
      ))}
    </div>
  );
};

export default MainList;
