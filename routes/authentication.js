const express = require("express");
const router = express.Router();
const authController = require("../controllers/authentication");
const token = require("./verifyToken");

router.post("/login", authController.getUsers);
router.put("/change-password", authController.changePassword);
router.post("/sign_up", authController.createUser);
router.get("/check-login", token.verifyToken, authController.checkLogin);
router.get("/user-name", token.verifyToken, authController.username);
module.exports = router;
