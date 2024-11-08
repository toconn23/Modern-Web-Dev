import Home from "./Home/Home";
import Main from "./Main/Main";
import Auth from "./Auth/Auth";
import AuthRegister from "./Auth/AuthRegister";
import AuthLogin from "./Auth/AuthLogin";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Components() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<AuthRegister />} />
        <Route path="/Login" element={<AuthLogin />} />
        <Route path="/Auth" element={<Auth />} />
        <Route
          path="/Main"
          element={<ProtectedRoute path="/" element={Main} />}
        />
      </Routes>
    </Router>
  );
}
