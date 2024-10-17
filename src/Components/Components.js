import Home from "./Home/Home";
import Main from "./Main/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Components() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Main" element={<Main />} />
      </Routes>
    </Router>
  );
}
