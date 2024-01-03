const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");
const token = require("../../backend/verifyToken");

router.get("/", token.verifyToken, profileController.getProfile);
router.put("/update", token.verifyToken, profileController.updateProfile);

module.exports = router;
