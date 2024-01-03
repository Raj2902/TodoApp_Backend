const users = require("../models/user");

exports.getProfile = async (req, res) => {
  try {
    const profile = await users.findById(req.user.userId, { password: 0 });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await users.findByIdAndUpdate(req.user.userId, req.body);
    await profile.save();
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
