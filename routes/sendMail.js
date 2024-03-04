const express = require("express");
const router = express.Router();
const EmailController = require("../controllers/sendMail");

router.get("/send-mail/:email", EmailController.sendMail);
router.get("/code-email/:code", EmailController.codeEmail);

module.exports = router;
