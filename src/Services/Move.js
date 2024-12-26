import Parse from "parse";
 
export const getMove = async (matchId, move) => {
  const Move = Parse.Object.extend("Move");
  const query = new Parse.Query(Move);
  query.equalTo("matchId", matchId);
  query.equalTo("move", move);
  try {
    const response = await query.first();
    console.log("Response: ", response);
    const board = response.get("board");
    console.log("Board: ", board);
    return board;
  } catch (err) {
    console.log("GET Error:", err);
  }
};
 
export const createMove = async (matchId, move, board) => {
  const Move = new Parse.Object("Move");
  Move.set("matchId", matchId);
  Move.set("move", move);
  Move.set("board", board);
  try {
    await Move.save();
  } catch (err) {
    console.log("POST Error:", err);
  }
};