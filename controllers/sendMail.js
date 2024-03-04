const nodemailer = require("nodemailer");
const User = require("../models/user");
require("dotenv").config();

exports.codeEmail = async (req, res) => {
  try {
    let user = await User.findOne({ code: req.params.code });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    } else {
      return res.status(200).json({ email: user.email });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

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
        to: req.params.email,
        subject: "Please reset your password",
        html: `<div style="font-family: sans-serif">
        <div style="text-align: center">
          <strong style="font-size: xx-large"
            >Reset your Todo App password</strong
          >
        </div>
        <div style="display: flex; justify-content: center">
          <div
            style="
              border: 1px solid grey;
              padding: 10px;
              text-align: center;
              display: inline-block;
              border-radius: 3%;
              margin-top: 2%;
              line-height: 2;
            "
          >
            <b style="font-size: x-large">Todo App password reset</b>
            <p>
              We heard that you lost your Todo App password. Sorry about that!
            </p>
            <p>
              But don't worry! You can use the following button to reset your
              password:
            </p>
            <button
              style="
                background-color: green;
                padding: 10px 20px;
                border-radius: 10%;
              "
            >
              <a
                style="text-decoration: none; color: white"
                href="https://todo-app-frontend-kappa.vercel.app/change-password/${rand}"
                >Reset your password</a
              >
            </button>
            <p>If you don't use this link within 5 minutes, it will expire.</p>
            <p>Thanks,<br />The Todo App Team</p>
          </div>
        </div>
        <p style="color: grey; text-align: center; margin-top: 4%">
          You're receiving this email because a password reset was requested for
          your account.
        </p>
      </div>`,
      };

      await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(info);
          }
        });
      });
      setTimeout(async () => {
        await User.findOneAndUpdate({ email: req.params.email }, { code: "" });
        console.log("code update null");
      }, 300000);
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
