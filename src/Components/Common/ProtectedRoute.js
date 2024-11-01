import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, flag, ...rest }) => {
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate(-1);
  };
  console.log("rest: ", rest);

  // hint: you can swp out the Navigate redirect for the Component
  // <Component />

  return (
    <div>
      {flag ? (
        <div>
          <Link to={rest.path}>Get Started Now!</Link>
        </div>
      ) : (
        <div>
          <p>
            <strong>Unauthorized, please log in</strong>.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute;
