require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
