import Parse from "parse";

// Fetch the name and objectId of each game asynchronously
export const getAllGames = async () => {
  const Game = Parse.Object.extend("Game");
  const query = new Parse.Query(Game);
  query.select("name"); // Select only the "name" attribute
  try {
    const response = await query.find();
    // Map the response to include only name and objectId
    const games = response.map((item) => ({
      name: item.get("name"),
      objectId: item.id,
    }));
    console.log(games);
    return games;
  } catch (err) {
    // Handle possible error
    console.log("GET Error:", err);
  }
};

// Fetch the name and objectId of each game asynchronously
export const getGameStats = async ({ gameId }) => {
  const Game = Parse.Object.extend("Game");
  const query = new Parse.Query(Game);
  query.select("name"); // Select only the "name" attribute
  try {
    const response = await query.find();
    // Map the response to include only name and objectId
    const games = response.map((item) => ({
      name: item.get("name"),
      objectId: item.id,
    }));
    console.log(games);
    return games;
  } catch (err) {
    // Handle possible error
    console.log("GET Error:", err);
  }
};
