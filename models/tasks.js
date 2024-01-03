const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  task_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("Task", taskSchema);
