import Parse from "parse";

export const updateLeaderboard = async (loser, winner) => {
  const Leaderboard = Parse.Object.extend("Leaderboard");
  const query = new Parse.Query(Leaderboard);
  query.equalTo("username", loser);
  try {
    const response = await query.first();
    response.set("losses", response.get("losses") + 1);
    response.save();
  } catch (err) {
    console.log("GET Error:", err);
  }
  query.equalTo("username", winner);
  try {
    const response = await query.first();
    response.set("wins", response.get("wins") + 1);
    response.save();
  } catch (err) {
    console.log("GET Error:", err);
  }
};

export const fetchLeaderboardData = async (setPlayers) => {
  const Leaderboard = Parse.Object.extend("Leaderboard");
  const query = new Parse.Query(Leaderboard);
  query.descending("wins"); // Sort by wins in descending order

  try {
      const results = await query.find();
      const leaderboardData = results.map((player) => ({
          username: player.get("username"),
          wins: player.get("wins"),
          losses: player.get("losses"),
      }));
      setPlayers(leaderboardData);
  } catch (error) {
      console.error("Error while fetching leaderboard data:", error);
  }
};
