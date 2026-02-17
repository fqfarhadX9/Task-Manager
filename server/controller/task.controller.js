const Task = require("../model/task.js");

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
      createdBy: req.user._id,
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

const assignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userIds } = req.body;

    if (!userIds || userIds.length === 0) {
      return res.status(400).json({ message: "User IDs required" });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    userIds.forEach(userId => {
      if (!task.assignedTo.includes(userId)) {
        task.assignedTo.push(userId);
      }
    });

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task assigned successfully",
      task,
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


const addTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // only assigned user or admin
    if (
      !task.assignedTo.includes(req.user._id) &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    task.todoChecklist.push({ text });
    await task.save(); // pre-save hook progress update karega

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { taskId, todoId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const todo = task.todoChecklist.id(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = !todo.completed;
    await task.save(); 

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { taskId, todoId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // permission: assigned user or admin
    if (
      !task.assignedTo.includes(req.user._id) &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const todo = task.todoChecklist.id(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.deleteOne(); 
    await task.save();

    res.json({ message: "Todo deleted", task });
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
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task status updated",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getMyTasks,
  assignTask,
  updateTask,
  addTodo,
  updateTodo,
  deleteTodo,
  deleteTask,
  getAllTasks,
  getAssignedTasks,
  updateTaskStatus,
};
