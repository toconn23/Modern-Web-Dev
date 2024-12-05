import React from "react";
import { Link } from "react-router-dom";

// Dummy Header Component
const Header = () => {
  return (
    <header className="bg-[#0C2340] text-white text-center p-2 mb-0">
      <Link to="/" className="text-white no-underline">
        <h1 className="text-2xl font-bold">Notre Dame Football Stats</h1>
      </Link>
      <Link to="/Auth">
        <button className="mt-2 px-4 py-2 bg-white text-[#0C2340] font-semibold rounded shadow hover:bg-gray-200">
          Auth
        </button>
      </Link>
    </header>
  );
};

export default Header;
