import React, { useEffect, useState } from "react";
import { loginUser } from "./AuthService";
import AuthLoginForm from "./AuthLoginForm";
import { useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (user && add) {
      loginUser(user).then((userLoggedIn) => {
        if (userLoggedIn) {
          nav(-1);
        }
        setAdd(false);
      });
    }
  }, [user, add]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, value: newValue } = e.target;
    console.log(newValue);
    setUser({ ...user, [name]: newValue });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target);
    setAdd(true);
  };

  return (
    <div>
      <AuthLoginForm
        user={user}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
    </div>
  );
};

export default AuthLogin;