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
