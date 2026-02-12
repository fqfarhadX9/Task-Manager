const Task = require("../model/task");

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ message: "Title & Due Date required" });
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
    const tasks = await Task.find({
      assignedTo: req.user._id,
    }).populate("createdBy", "name email");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const assignTask = async (req, res) => {
  try {
    const { users } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.assignedTo = users;
    await task.save();

    res.json({ message: "Task assigned", task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (
      task.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
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

const toggleTodo = async (req, res) => {
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


module.exports = {
  createTask,
  getMyTasks,
  assignTask,
  updateTask,
  addTodo,
  toggleTodo,
};
