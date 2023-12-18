const express = require("express");
const app = express();
const cors = require("cors");
const cron = require("node-cron");
const { fetchAndSaveData } = require("./utils/index");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//routes
app.use(require("./routes/index"));

app.listen(4000, () => console.log("Listening on port 4000"));

//CronJob
cron.schedule("0 0 * * *", () => {
  console.log("Running a daily task");
  const fromDate = "2023-04-05";
  const toDate = new Date().toISOString().split("T")[0];
  const leagueId = 152;
  fetchAndSaveData(fromDate, toDate, leagueId);
  console.log("Daily task completed");
});