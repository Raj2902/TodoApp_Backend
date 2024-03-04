const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasks");
const token = require("./verifyToken");

router.post("/create", token.verifyToken, taskController.createTask);
router.get("/read/:task_id", token.verifyToken, taskController.getTask);
router.get("/read-all", token.verifyToken, taskController.getTasks);
router.delete("/delete/:task_id", token.verifyToken, taskController.deleteTask);
router.delete(
  "/delete-all/:user_id",
  token.verifyToken,
  taskController.deleteAllTask
);
router.put("/update/:task_id", token.verifyToken, taskController.updateTask);

module.exports = router;
