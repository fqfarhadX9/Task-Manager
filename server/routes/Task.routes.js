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
  updateTodo
} = require("../controllers/task.controller");
const { deleteTodo, deleteTask, getAllTasks, getAssignedTasks, updateTaskStatus } = require("../controller/task.controller.js");

router.post("/", protect, createTask);
router.get("/my-tasks", protect, getMyTasks);
router.put("/assign/:id", protect, isAdmin, assignTask);
router.put("/:id", protect, updateTask);
router.post("/:id/todo", protect, addTodo);
router.put("/:taskId/todo/:todoId", protect, updateTodo);
router.delete("/:taskId/todo/:todoId", protect, deleteTodo);
router.delete("/:id", protect, isAdmin, deleteTask);
router.get("/", protect, isAdmin, getAllTasks);
router.get("/assigned", protect, getAssignedTasks);
router.put("/status/:id", protect, updateTaskStatus);



module.exports = router;
