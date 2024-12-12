import Parse from "parse";
import * as ENV from "../../../environment.js";

export async function liveQuery(
  setBoard,
  setTurn,
  setSelectedPiece,
  setValidMoves,
  id
) {
  var client = new Parse.LiveQueryClient({
    applicationId: ENV.APPLICATION_ID,
    serverURL: ENV.LIVE_SERVER_URL,
    javascriptKey: ENV.JAVASCRIPT_KEY,
  });
  client.open();
  var query = new Parse.Query("Matches").equalTo("objectId", id);
  try {
    var subscription = await client.subscribe(query);
    subscription.on("update", (object) => {
      setBoard(object.get("board"));
      setTurn(object.get("turn"));
      //reset the selected piece and valid moves to prevent moving twice
      setSelectedPiece(null);
      setValidMoves([]);
    });
    subscription.on("create", (object) => {
      setBoard(object.get("board"));
      console.log("object created");
    });
  } catch (ex) {
    console.log(ex);
  }
}

export const updateGame = async (id, board, turn, winner) => {
  const query = new Parse.Query("Matches");
  try {
    const match = await query.get(id);
    match.set("board", board);
    match.set("turn", turn);
    match.set("winner", winner);
    await match.save();
    console.log("Success! match updated!");
  } catch (error) {
    console.log(`Error! ${error.message}`);
  }
};

export const getGame = async (id) => {
  const query = new Parse.Query("Matches");
  try {
    const match = await query.get(id);
    return match;
  } catch (error) {
    console.log(`Error! ${error.message}`);
  }
};
