import Home from "./Home/Home";
import Main from "./Main/Main";
import Auth from "./Auth/Auth";
import AuthRegister from "./Auth/AuthRegister";
import AuthLogin from "./Auth/AuthLogin";
import Game from "./Game/Game";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

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
        <Route
          path="/Dashboard"
          element={<ProtectedRoute path="/" element={Dashboard} />}
        />
        <Route path="/Game/:id" element={<Game />} />
      </Routes>
    </Router>
  );
}
