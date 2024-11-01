import React from "react";
import Header from "../Common/Header.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Parse from "parse";
import ProtectedRoute from "../Common/ProtectedRoute.js";
import Main from "../Main/Main.js";
// Home Page Component
const HomePage = () => {
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = Parse.User.current();
    setUser(user);
    if (user !== null) {
      console.log("authorized!");
      setFlag(true);
    } else {
      console.log("unauthorized!");
      setFlag(false);
    }
    console.log(flag);
  }, []);
  return (
    <div>
      <Header />
      <div>
        <Link to="/register">
          <button>Register</button>
        </Link>
        <br />
        <br />
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
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
        <ProtectedRoute exact path="/Main" flag={flag} element={Main} />
      </section>
    </div>
  );
};
export default HomePage;
