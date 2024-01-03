const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const app = express();
const authRouter = require("./routes/authentication");
const taskRouter = require("./routes/tasks");
const profileRouter = require("./routes/profile");
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
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/authentication", authRouter);
app.use("/task", taskRouter);
app.use("/profile", profileRouter);
