import React from "react";

const MainComments = ({ comments = [] }) => {
  return (
    <div style={{ border: "2px solid black", maxWidth: "600px" }}>
      {comments.map((comment, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            maxWidth: "600px", // Restricts the width of the div
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Adds a subtle shadow for a cleaner look
          }}
        >
          <p>User: {comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MainComments;
