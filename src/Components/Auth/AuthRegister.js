import React, { useEffect, useState } from "react";
import { createUser } from "./AuthService";
import AuthRegisterForm from "./AuthRegisterForm";
import { useNavigate } from "react-router-dom";
import { checkUser } from "./AuthService";

const AuthRegister = () => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  if (newUser) {
    console.log("newUser: ", newUser);
  }

  const nav = useNavigate();
  // flag is the state to watch for add/remove updates
  const [add, setAdd] = useState(false);

  useEffect(() => {
    if (checkUser()) {
      nav("/");
    }
    if (newUser && add) {
      //create the user
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          // alert(
          //   `${userCreated.get("firstName")}, you successfully registered!`
          // );
          nav("/");
        }
        setAdd(false);
      });
    }
  }, [newUser, add, nav]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
    setNewUser({ ...newUser, [name]: newValue });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setAdd(true);
  };

  return (
    <div>
      <AuthRegisterForm
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
    </div>
  );
};

export default AuthRegister;
