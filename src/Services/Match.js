import Parse from "parse";

export const createMatch = async (black, red) => {
  const match = new Parse.Object("Matches");
  match.set("black", black);
  match.set("red", red);
  match.set("turn", "r");
  match.set("board", [
    ["b", "-", "b", "-", "b", "-", "b", "-"],
    ["-", "b", "-", "b", "-", "b", "-", "b"],
    ["b", "-", "b", "-", "b", "-", "b", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "r", "-", "r", "-", "r", "-", "r"],
    ["r", "-", "r", "-", "r", "-", "r", "-"],
    ["-", "r", "-", "r", "-", "r", "-", "r"],
  ]);

  try {
    const result = await match.save();
    console.log("Match created with id: ", result.id);
    return result;
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const getMatches = async (username) => {
  const userQuery = new Parse.Query("Leaderboard");
  userQuery.equalTo("username", username);
  try {
    const user = await userQuery.first();
    const blackQuery = new Parse.Query("Matches");
    const blackCondition = blackQuery.equalTo("black", user);
    const redQuery = new Parse.Query("Matches");
    const redCondition = redQuery.equalTo("red", user);
    const query = Parse.Query.or(blackCondition, redCondition);
    const matches = await query.find();
    return matches;
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const getUserByUsername = async (username) => {
  const query = new Parse.Query("Leaderboard");
  try {
    console.log("Username: ", username);
    query.equalTo("username", username);
    let user = await query.first();
    console.log("User: ", user);
    return user;
  } catch (err) {
    console.log("Error: ", err);
  }
};
