import React, { useState } from "react";

const MainCommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment(""); // Clear the input field after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="comment">Leave a Comment:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          rows="4"
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MainCommentForm;
