import React from "react";
import Header from "../Common/Header.js";
import { Link } from "react-router-dom";
// Home Page Component
const HomePage = () => {
  return (
    <div>
      <Header />
      <section
        style={{
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h2>Welcome to the Notre Dame Football Stats Page</h2>
        <p>
          Explore stats, player information, game results, and more for Notre
          Dame football. Stay updated with the latest stats and insights on your
          favorite team!
        </p>
        {/* <ProtectedRoute element={Main} /> */}
      </section>
      <Link to="/Main">
        <button>Go to Main</button>
      </Link>
    </div>
  );
};
export default HomePage;
