const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware.js");
const isAdmin = require("../middleware/authMiddleware.js");

const {
  createTask,
  getMyTasks,
  assignTask,
  updateTask,
  addTodo,
  toggleTodo
} = require("../controllers/task.controller");

router.post("/", protect, createTask);
router.get("/my-tasks", protect, getMyTasks);
router.put("/assign/:id", protect, isAdmin, assignTask);
router.put("/:id", protect, updateTask);
router.post("/:id/todo", protect, addTodo);
router.put("/:taskId/todo/:todoId", protect, toggleTodo);


module.exports = router;
