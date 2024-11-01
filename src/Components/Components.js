import Home from "./Home/Home";
import Main from "./Main/Main";
import AuthRegister from "./Auth/AuthRegister";
import AuthLogin from "./Auth/AuthLogin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Components() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Register" element={<AuthRegister />} />
        <Route path="/Login" element={<AuthLogin />} />
      </Routes>
    </Router>
  );
}
