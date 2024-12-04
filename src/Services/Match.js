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
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const getUserByUsername = async (username) => {
  const query = new Parse.Query(Parse.User);
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
