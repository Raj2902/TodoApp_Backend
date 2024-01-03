const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

const bcrypt = require("bcrypt");

const saltRounds = 10;

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

function validatePassword(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, isValid) => {
      if (err) reject(err);
      resolve(isValid);
    });
  });
}

exports.getUsers = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    const isValid = await validatePassword(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "4h",
    });
    await User.findOneAndUpdate({ email: req.body.email }, { token });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const hash = await encryptPassword(req.body.password);
    req.body.password = hash;
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.checkLogin = async (req, res) => {
  try {
    const check = await User.findById(req.user.userId);
    if (check && check.token)
      return res.status(200).json({ message: "Active." });
    return res.status(400).json({ message: "Unactive." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.username = async (req, res) => {
  try {
    const check = await User.findById(req.user.userId);
    if (check) {
      return res.status(200).json({ username: check.name });
    }
    return res.status(400).json({ message: "No such user exists." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
