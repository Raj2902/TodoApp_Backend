const express = require("express");
const cors = require("cors");
const port = 3000;
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
// Connect to MongoDB
mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get("/", (req, res) => {
  res.send({ message: "Server setup successfully." });
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/authentication", authRouter);
app.use("/task", taskRouter);
app.use("/profile", profileRouter);
app.use("/", mailRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Export the Express API
module.exports = app;
