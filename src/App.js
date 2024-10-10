import "./App.css";
import Parse from "parse";
import Main from "./Components/Main/Main.js";
import * as ENV from "./environment.js";

Parse.initialize(ENV.APPLICATION_ID, ENV.JAVASCRIPT_KEY);
Parse.serverURL = ENV.SERVER_URL;
function App() {
  return <Main />;
}

export default App;
