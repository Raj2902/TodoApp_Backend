const express = require("express");
const cors = require("cors");
const port = 5000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const app = express();
const authRouter = require("./routes/authentication");
const taskRouter = require("./routes/tasks");
const profileRouter = require("./routes/profile");
const mailRouter = require("./routes/sendMail");
require("dotenv").config();
const databaseUrl = process.env.DATABASE_URL;

mongoose.set("strictQuery", false);

app.get("/", (req, res) => {
  // Connect to MongoDB
  mongoose
    .connect(databaseUrl)
    .then(() => {
      console.log("Connected to MongoDB Atlas");
      res.json({
        server_status: "Server setup successfully.",
        server_status_code: 200,
        database_status: "Connected to MongoDB Atlas",
        database_status_code: 200
      })
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB Atlas:", err);
      res.json({
        server_status: "Server setup successfully.",
        server_status_code: 200,
        database_status: err,
        database_status_code: 500
      })
    });
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/authentication", authRouter);
app.use("/task", taskRouter);
app.use("/profile", profileRouter);
app.use("/", mailRouter);

try {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (err) {
  console.error('Failed to start the server:', err);
}
