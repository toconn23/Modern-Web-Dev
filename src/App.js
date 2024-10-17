import "./App.css";
import Parse from "parse";
import Components from "./Components/Components.js";
import * as ENV from "./environment.js";

Parse.initialize(ENV.APPLICATION_ID, ENV.JAVASCRIPT_KEY);
Parse.serverURL = ENV.SERVER_URL;
function App() {
  return <Components />;
}

export default App;
