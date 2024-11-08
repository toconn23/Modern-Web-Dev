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
    <div>
      <Header />
      <Link to="/register">
        <button>Register</button>
      </Link>
      <br />
      <br />
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}
