import Parse from "parse";

//fetch the stats of each team from the stats.json file for the game
// do this data fetching asynchronously
export const getAllStats = async () => {
  const Stats = Parse.Object.extend("Stats");
  const query = new Parse.Query(Stats);
  try {
    const response = await query.find();
    const stats = response.map((item) => item.toJSON());
    return stats;
  } catch (err) {
    // handle possible error
    console.log("GET Error:", err);
  }
};

// Fetch the name and objectId of each game asynchronously
export const getGameStats = async (gameId) => {
  const Stats = Parse.Object.extend("Stats");
  const query = new Parse.Query(Stats);
  query.equalTo("gameId", gameId);
  try {
    const response = await query.find();
    const stats = response.map((item) => item.toJSON());
    return stats;
  } catch (err) {
    // handle possible error
    console.log("GET Error:", err);
  }
};
