import React from "react";
import { Link } from "react-router-dom";
// Dummy Header Component
const Header = () => {
  return (
    <header
      style={{
        backgroundColor: "#0C2340",
        color: "#FFFFFF",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Link to="/" style={{ color: "#FFFFFF", textDecoration: "none" }}>
        <h1>Notre Dame Football Stats</h1>
      </Link>
      <Link to="/Auth">
        <button>Auth</button>
      </Link>
    </header>
  );
};

export default Header;
