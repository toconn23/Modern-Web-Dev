import Parse from "parse";
// Fetch the name and objectId of each game asynchronously
export const getComments = async () => {
  const Comments = Parse.Object.extend("Comment");
  const query = new Parse.Query(Comments);
  try {
    const response = await query.find();
    const comments = response.map((item) => item.toJSON());
    return comments;
  } catch (err) {
    // handle possible error
    console.log("GET Error:", err);
  }
};

export const createComment = (Content) => {
  console.log("Creating:", Content);
  const Comment = Parse.Object.extend("Comment");
  const comment = new Comment();
  // using setter to UPDATE the object
  comment.set("content", Content);
  comment.save();
  return comment.toJSON();
};
