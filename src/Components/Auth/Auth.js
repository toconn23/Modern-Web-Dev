import React from "react";
import Header from "../Common/Header.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";
import { checkUser } from "./AuthService";

export default function Auth() {
  const navigate = useNavigate();

  // redirect already authenticated users back to home
  useLayoutEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/");
    }
  }, [navigate]);

  // Auth Page Component
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="space-y-6">
          <Link to="/register">
            <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Register
            </button>
          </Link>
          <br />
          <Link to="/login">
            <button className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Login
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
