const express = require("express");
const router = express.Router();
const EmailController = require("../controllers/sendMail");

router.get("/send-mail/:email", EmailController.sendMail);

module.exports = router;
