const tasks = require("../models/tasks"); // Assuming your model is in a models directory

exports.getTasks = async (req, res) => {
  try {
    const result = await tasks.find({ user: req.user.userId });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await tasks.findById(req.params.task_id);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    //console.log(req.body);
    req.body.user = req.user.userId;
    const task = new tasks(req.body);
    await task.save();
    res.json({ message: "Task created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await tasks.findByIdAndUpdate(req.params.task_id, req.body);
    await task.save();
    res.json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await tasks.findByIdAndDelete(req.params.task_id);

    if (!deletedTask) {
      res.status(404).json({ error: "Task not found" }); // Handle not found case
    } else {
      res.json({ message: "Task deleted successfully" });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: "Failed to delete task" }); // Generic error response
  }
};
