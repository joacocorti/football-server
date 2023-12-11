const express = require('express') 
const app = express();
const cors = require('cors');
const cron = require("node-cron");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use(require('./routes/index'))

app.listen(4000, () => console.log('Listening on port 4000'))


cron.schedule("0 0 * * *", () => {
  console.log("Running a daily task");
});