const nodemailer = require("nodemailer");
const User = require("../models/user");

exports.sendMail = async (req, res) => {
  try {
    let rand = Math.random();

    let updatedCode = await User.findOneAndUpdate(
      { email: req.params.email },
      { code: rand }
    );
    if (updatedCode) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "todoapp907@gmail.com",
          pass: "bfnlpjkjnnxkspwd",
        },
      });

      const mailOptions = {
        from: "todoapp907@gmail.com",
        to: `${req.params.email}`,
        subject: "Change Password",
        html: `<p>Click the link below to change your password only valid for 30s.</p>
            <a href=${`https://todo-app-frontend-kappa.vercel.app/${rand}`}>Change Password.</b>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          //console.log("Email sent:", info.response);
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
