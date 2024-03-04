const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    require: true,
  },
  createdAt: { type: Date, expires: 300, default: Date.now },
});

module.exports = mongoose.model("Code", codeSchema);
