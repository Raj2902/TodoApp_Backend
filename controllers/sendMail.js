const nodemailer = require("nodemailer");
const User = require("../models/user");
require("dotenv").config();

exports.sendMail = async (req, res) => {
  try {
    let rand = Math.random();

    let updatedCode = await User.findOneAndUpdate(
      { email: req.params.email },
      { code: rand }
    );
    if (updatedCode) {
      // Credentials for a trusted email service provider (replace with your own)
      const transporter = nodemailer.createTransport({
        service: "gmail", // Use a reliable service like Gmail or SendGrid
        auth: {
          user: "rajagarwalgood@gmail.com",
          pass: "mujy wgvo iyyd bvxe",
        },
      });

      const mailOptions = {
        from: '"Raj Agarwal" <rajagarwalgood@gmail.com>',
        to: "rajagarwalawesom29@gmail.com",
        subject: "Test Email from Node.js",
        text: "This is a plain text email sent using Nodemailer.",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent:", info.response);
          res.status(200).json({ message: "Mail sent", body: info.response });
        }
      });
      setTimeout(async () => {
        await User.findOneAndUpdate({ email: req.params.email }, { code: "" });
      }, 30000);
      return res.status(200).json({
        message: "Mail send successfully",
        link: `https://todo-app-frontend-kappa.vercel.app/${rand}`,
      });
    }
    return res.status(400).json({
      message: "No such user is registered with us.",
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
