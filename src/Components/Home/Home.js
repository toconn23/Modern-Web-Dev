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
        <p>actually checkers now</p>
        {/* <ProtectedRoute element={Main} /> */}
      </section>
      <Link to="/Dashboard">
        <button>Dashboard</button>
      </Link>
    </div>
  );
};
export default HomePage;
