import Parse from "parse";

//fetch the stats of each team from the stats.json file for the game
// do this data fetching asynchronously
export const getAllStats = async () => {
  const stats = Parse.Object.extend("stats");
  const query = new Parse.Query(stats);
  try {
    // const Stats1 = Parse.Object.extend({
    //   className: "Stats",
    //   id: 0,
    //   name: "Louisville",
    //   score: 14,
    //   firstDowns: 15,
    // });
    // const Stats2 = Parse.Object.extend({
    //   className: "Stats1",
    //   id: 1,
    //   name: "Notre Dame",
    //   score: 24,
    //   firstDowns: 24,
    // });
    // const stats1 = new Stats1();
    // const stats2 = new Stats2();
    // await the axios fetch
    const response = await query.find();
    const stats = response.map((item) => item.toJSON());
    return stats;
    // console.log([stats1, stats2]);
  } catch (err) {
    // handle possible error
    console.log("GET Error:", err);
  }
};
