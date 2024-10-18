import Parse from "parse";

// Fetch the name and objectId of each game asynchronously
export const getAllGames = async () => {
  const Game = Parse.Object.extend("Game");
  const query = new Parse.Query(Game);
  query.select("name"); // Select only the "name" attribute
  try {
    const response = await query.find();
    // Map the response to include only name and objectId
    const games = response.map((item) => item.toJSON());
    return games;
  } catch (err) {
    // Handle possible error
    console.log("GET Error:", err);
  }
};
