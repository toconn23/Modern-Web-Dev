import Parse from "parse";
// create a new user
export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  console.log("User: ", user);

  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};
// login a user
export const loginUser = (user) => {
  return Parse.User.logIn(user.email, user.password)
    .then((user) => {
      return user;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};
// check if user is authenticated
export const checkUser = () => {
  return Parse.User.current()?.authenticated;
};

export const getUserId = () => {
  return Parse.User.current()?.id;
};
