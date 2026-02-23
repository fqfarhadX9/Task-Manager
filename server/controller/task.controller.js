const Task = require("../model/task.js");
const calculateTaskProgress = require("../utils/calculateTaskProgress.js");
const { updateSubtaskProgress, updateTaskProgress } = require("../utils/progressUtils");

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    if (!title || !dueDate || !description) {
      return res.status(400).json({ message: "Title, Description & Due Date required" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyTasks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, status, priority } = req.query;

    let query = {
      $or: [
        { createdBy: req.user._id },
        { assignedTo: req.user._id },
      ],
    };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    const tasks = await Task.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("assignedTo", "name email");

    const totalTasks = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      page,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const assignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userIds } = req.body;

    if (!userIds || userIds.length === 0) {
      return res.status(400).json({ message: "User IDs required" });
    }

    const task = await Task.findById(id)

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    
    const isCreator =
      task.createdBy.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isAdmin && !isCreator) {
      return res.status(403).json({ message: "Not allowed" });
    }

    let newlyAssignedCount = 0;

    userIds.forEach(userId => {
      const alreadyAssigned = task.assignedTo.some(
        id => id.toString() === userId.toString()
      );

      if (!alreadyAssigned) {
        task.assignedTo.push(userId);
        newlyAssignedCount++;
      }
    });

    task.activity.push({
      action: "assigned",
      message: `${req.user.name} assigned ${
      newlyAssignedCount === 1 ? "1 user" : `${newlyAssignedCount} users`
      }`,
      performedBy: req.user._id,
    });

    await task.save();

    const updatedTask = await Task.findById(id)
      .populate("assignedTo", "name email")
      .populate("activity.performedBy", "name");

    res.status(200).json({
      success: true,
      message: "Task assigned successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const unassignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isCreator =
      task.createdBy.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isAdmin && !isCreator) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const targetIsAssigned = task.assignedTo.some(
      id => id.toString() === userId.toString()
    );

    if (!targetIsAssigned) {
      return res.status(400).json({ message: "User not assigned to this task" });
    }

    task.assignedTo = task.assignedTo.filter(
      id => id.toString() !== userId.toString()
    );

    task.activity.push({
      action: "unassigned",
      message: `${req.user.name} unassigned 1 user`,
      performedBy: req.user._id,
    });

    await task.save();

    const updatedTask = await Task.findById(id)
      .populate("assignedTo", "name email")
      .populate("activity.performedBy", "name");

    res.status(200).json({
      success: true,
      message: "User unassigned successfully",
      task: updatedTask,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isAssigned = task.assignedTo.some(
      (id) => id.toString() === req.user._id.toString()
    );

    const isCreator =
      task.createdBy.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isAssigned && !isAdmin && !isCreator) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Jo fields frontend se aaya.. Wahi task me update
    Object.assign(task, req.body);
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.isDeleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isCreator = task.createdBy
      .map(id => id.toString())
      .includes(req.user._id.toString());

    const isAdmin = req.user.role === "admin";

    if (!isCreator && !isAdmin) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.isDeleted = true;
    await task.save();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, status, priority } = req.query;

    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    const tasks = await Task.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalTasks = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      page,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAssignedTasks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, status, priority } = req.query;

    let query = {
      assignedTo: req.user._id, 
    };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    const tasks = await Task.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalTasks = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      page,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = ["pending", "in_progress", "completed"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isAssigned = task.assignedTo.some(
      (id) => id.toString() === req.user._id.toString()
    );

    const isCreator =
      task.createdBy.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isAssigned && !isAdmin && !isCreator) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.status = status;
    task.activity.push({
      action: "status_changed",
      message: `${req.user.name} changed status to ${task.status}`,
      performedBy: req.user._id
    });

    await task.save();

    const updatedTask = await Task.findById(id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .populate("activity.performedBy", "name");

    res.status(200).json({
      success: true,
      message: "Task status updated",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isCreator =
      task.createdBy._id.toString() === req.user._id.toString();

    const isAssigned =
      task.assignedTo.some(
        u => u._id.toString() === req.user._id.toString()
      );

    const isAdmin = req.user.role === "admin";

    if (!isCreator && !isAssigned && !isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json({ task });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Todo text is required" });
    }

    const task = await Task.findById(id);

    if (!task || task.isDeleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isCreator =
      task.createdBy.toString() === req.user._id.toString();

    const isAssigned = task.assignedTo.some(
      uid => uid.toString() === req.user._id.toString()
    );

    const isAdmin = req.user.role === "admin";

    if (!isCreator && !isAssigned && !isAdmin) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.todoChecklist.push({
      text: text.trim(),
    });

    const {progress, status} = calculateTaskProgress(task)
    task.progress = progress;
    task.status = status;

    task.activity.push({
      action: "todo_added",
      message: `${req.user.name} added a todo`,
      performedBy: req.user._id,
    });

    await task.save();

    const updatedTask = await Task.findById(id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name");

    res.status(201).json({
      success: true,
      task: updatedTask,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleTodo = async (req, res) => {
  try {
    const { taskId, todoId } = req.params;

    const task = await Task.findById(taskId);

    if (!task || task.isDeleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isCreator =
      task.createdBy.toString() === req.user._id.toString();

    const isAssigned = task.assignedTo.some(
      uid => uid.toString() === req.user._id.toString()
    );

    const isAdmin = req.user.role === "admin";

    if (!isCreator && !isAssigned && !isAdmin) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const todo = task.todoChecklist.id(todoId);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = !todo.completed;

    const {progress, status} = calculateTaskProgress(task)
    task.progress = progress;
    task.status = status;

    task.activity.push({
      action: "todo_toggled",
      message: `${req.user.name} ${
        todo.completed ? "completed" : "reopened"
      } a todo`,
      performedBy: req.user._id,
    });

    await task.save();

    const updatedTask = await Task.findById(taskId)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name");

    res.status(200).json({
      success: true,
      task: updatedTask,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { taskId, todoId } = req.params;

    const task = await Task.findById(taskId);

    if (!task || task.isDeleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isCreator =
      task.createdBy.toString() === req.user._id.toString();

    const isAssigned = task.assignedTo.some(
      uid => uid.toString() === req.user._id.toString()
    );

    const isAdmin = req.user.role === "admin";

    if (!isCreator && !isAssigned && !isAdmin) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const todo = task.todoChecklist.id(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.deleteOne(); 

    const {progress, status} = calculateTaskProgress(task)
    task.progress = progress;
    task.status = status;

    task.activity.push({
      action: "todo_deleted",
      message: `${req.user.name} deleted a todo`,
      performedBy: req.user._id,
    });

    await task.save();

    const updatedTask = await Task.findById(taskId)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name");

    res.status(200).json({
      success: true,
      task: updatedTask,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSubtask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, todos } = req.body;

    const task = await Task.findById(taskId);

    if (!task || task.isDeleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (!title || !title.trim() || !description || !description.trim() || !todos || !Array.isArray(todos)) {
      return res.status(400).json({ message: "Subtask title, description, and todos are required" });
    }

    const newSubtask = {
      title,
      description,
      todoChecklist: todos?.map(text => ({
        text,
        completed: false
      })) || [],
      progress: 0,
      status: "pending"
    };

    task.subtasks.push(newSubtask);

    // Get reference of newly added subtask
    const addedSubtask = task.subtasks[task.subtasks.length - 1];

    // Update subtask progress
    updateSubtaskProgress(addedSubtask);

    // Update parent task progress
    updateTaskProgress(task);

    task.activity.push({
      action: "subtask_created",
      message: `Subtask "${title}" created`,
      performedBy: req.user._id
    });

    await task.save();

    res.status(201).json({
      message: "Subtask created successfully",
      task
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleSubtaskTodo = async (req, res) => {
  try {
    const { taskId, subtaskId, todoId } = req.params;

    const task = await Task.findById(taskId);

    if (!task || task.isDeleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    const subtask = task.subtasks.id(subtaskId);
    if (!subtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }

    const todo = subtask.todoChecklist.id(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = !todo.completed;

    updateSubtaskProgress(subtask);

    updateTaskProgress(task);

    task.activity.push({
      action: "subtask_todo_toggled",
      message: `Todo "${todo.text}" marked as ${todo.completed ? "completed" : "pending"}`,
      performedBy: req.user._id
    });

    await task.save();

    res.json({
      message: "Subtask todo updated successfully",
      task
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addSubtaskTodo = async (req, res) => {
  try {
    const { taskId, subtaskId} = req.params;
    const { text } = req.body;

    const task = await Task.findById(taskId);

    if (!task || task.isDeleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    const subtask = task.subtasks.id(subtaskId);
    if (!subtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Todo text is required" });
    }

    const newTodo = {
      text,
      completed: false
    };

    subtask.todoChecklist.push(newTodo);

    updateSubtaskProgress(subtask);

    updateTaskProgress(task);

    task.activity.push({
      action: "subtask_todo_added",
      message: `Todo "${newTodo.text}" added to subtask`,
      performedBy: req.user._id
    });

    await task.save();

    res.json({
      message: "Subtask todo added successfully",
      task
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSubtaskTodo = async (req, res) => {
  try {
    const { taskId, subtaskId, todoId } = req.params;

    const task = await Task.findById(taskId);

    if (!task || task.isDeleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    const subtask = task.subtasks.id(subtaskId);
    if (!subtask) {
      return res.status(404).json({ message: "Subtask not found" });
    }

    const todo = subtask.todoChecklist.id(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const deletedText = todo.text;

    subtask.todoChecklist.pull(todoId);

    updateSubtaskProgress(subtask);

    updateTaskProgress(task);

    task.activity.push({
      action: "subtask_todo_deleted",
      message: `Todo "${deletedText}" deleted from subtask`,
      performedBy: req.user._id
    });

    await task.save();

    res.json({
      message: "Todo deleted successfully",
      task
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getMyTasks,
  assignTask,
  unassignTask,
  updateTask,
  deleteTask,
  getAllTasks,
  getAssignedTasks,
  updateTaskStatus,
  getSingleTask,
  addTodo,
  toggleTodo,
  deleteTodo,
  createSubtask,
  toggleSubtaskTodo,
  addSubtaskTodo,
  deleteSubtaskTodo,
};
