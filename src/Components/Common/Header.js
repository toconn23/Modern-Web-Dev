import React from "react";
import Parse from "parse";
import { Link } from "react-router-dom";
import { logoutUser } from "../Auth/AuthService";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();
  const handleLogout = () => {
    logoutUser();
    nav("/");
  };

  return (
    <header className="bg-[#0C2340] text-white text-center  p-4 mb-0 flex justify-between items-center">
      {/* Logo centered */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link to="/" className="text-white no-underline">
          <h1 className="text-2xl font-bold">Cool Checkers</h1>
        </Link>
      </div>

      {/* Buttons on the right */}
      <div className="flex items-center ml-auto">
        {!Parse.User.current() && (
          <>
            <Link to="/Register">
              <button className="px-4 py-2 bg-white text-[#0C2340] font-semibold rounded shadow hover:bg-gray-200">
                Register
              </button>
            </Link>
            <Link to="/Login">
              <button className="ml-4 px-4 py-2 bg-indigo-400 text-[#0C2340] font-semibold rounded shadow hover:bg-indigo-600">
                Login
              </button>
            </Link>
          </>
        )}

        {/* Logout Button */}
        {Parse.User.current() && (
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-2 bg-red-500 text-white font-semibold rounded shadow hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
