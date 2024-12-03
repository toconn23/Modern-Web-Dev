import "./App.css";
import Parse from "parse";
import Components from "./Components/Components.js";
import * as ENV from "./environment.js";

Parse.initialize(ENV.APPLICATION_ID, ENV.JAVASCRIPT_KEY);
Parse.serverURL = ENV.SERVER_URL;

function App() {
  return <Components />;
}

// async function liveQuery() {
//   var client = new Parse.LiveQueryClient({
//     applicationId: ENV.APPLICATION_ID,
//     serverURL: ENV.LIVE_SERVER_URL,
//     javascriptKey: ENV.JAVASCRIPT_KEY,
//   });
//   client.open();
//   var query = new Parse.Query("Matches");
//   try {
//     var subscription = await client.subscribe(query);
//     subscription.on("open", () => {
//       console.log("subscription opened");
//     });
//     subscription.on("update", (object) => {
//       console.log("object updated");
//     });
//     subscription.on("create", (object) => {
//       console.log("object created");
//     });
//   } catch (ex) {
//     console.log(ex);
//   }
// }

// liveQuery();
export default App;
