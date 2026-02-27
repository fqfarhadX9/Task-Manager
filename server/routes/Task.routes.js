const express = require("express");
const router = express.Router();

const {protect, isAdmin} = require("../middleware/authMiddleware.js");

const {
  createTask,
  getMyTasks,
  assignTask,
  updateTask,
  deleteTask, 
  getAllTasks, 
  getAssignedTasks, 
  updateTaskStatus,
  unassignTask,
  getSingleTask,
  addTodo,
  toggleTodo,
  deleteTodo,
  createSubtask,
  toggleSubtaskTodo,
  updateSubtask,
  deleteSubtask,
  addSubtaskTodo,
  deleteSubtaskTodo,
  clearActivity,
  getProjectAnalytics,
} = require("../controller/task.controller.js");

router.post("/", protect, createTask);
router.get("/my-tasks", protect, getMyTasks);
router.put("/assign/:id", protect, isAdmin, assignTask);
router.put("/unassign/:id", protect, unassignTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, isAdmin, deleteTask);
router.get("/", protect, isAdmin, getAllTasks);
router.get("/assigned", protect, getAssignedTasks);
router.put("/status/:id", protect, updateTaskStatus);
router.get("/:id", protect, getSingleTask);
router.post("/todo/:id", protect, addTodo);
router.put("/todo/:taskId/:todoId", protect, toggleTodo);
router.delete("/todo/:taskId/:todoId", protect, deleteTodo);
router.post("/:taskId/subtask", protect, createSubtask);
router.put("/:taskId/subtask/:subtaskId/todo/:todoId", protect, toggleSubtaskTodo);
router.post("/:taskId/subtask/:subtaskId/todo", protect, addSubtaskTodo);
router.delete("/:taskId/subtask/:subtaskId/todo/:todoId", protect, deleteSubtaskTodo);
router.put("/:taskId/subtask/:subtaskId", protect, updateSubtask);
router.delete("/:taskId/subtask/:subtaskId", protect, deleteSubtask);
router.put("/:taskId/activity/clear", protect, clearActivity);
router.get("/analytics", protect, getProjectAnalytics);

module.exports = router;
