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



module.exports = router;
