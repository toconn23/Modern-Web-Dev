import React, { useEffect, useState } from "react";
import { loginUser } from "./AuthService";
import AuthLoginForm from "./AuthLoginForm";
import Header from "../Common/Header";
import { useNavigate } from "react-router-dom";
import { checkUser } from "./AuthService";

const AuthLogin = () => {
  const nav = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // flag is the state to watch for add/remove updates
  const [add, setAdd] = useState(false);

  //check if user is authenticated
  useEffect(() => {
    if (checkUser()) {
      nav("/");
    }
    if (user && add) {
      loginUser(user).then((userLoggedIn) => {
        if (userLoggedIn) {
          nav("/");
        }
        setAdd(false);
      });
    }
  }, [user, add, nav]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
    setUser({ ...user, [name]: newValue });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target);
    setAdd(true);
  };

  return (
    <div>
      <Header />
      <AuthLoginForm
        user={user}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
    </div>
  );
};

export default AuthLogin;
