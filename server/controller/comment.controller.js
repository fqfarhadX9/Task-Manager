const Task = require("../model/task");
const Comment = require("../model/comment");

const addComment = async (req, res) => {
  try {
    const { id } = req.params; 
    const { text } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const comment = await Comment.create({
      task: id,
      user: req.user._id,
      text,
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate("user", "name email");

    res.status(201).json({ comment: populatedComment });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskComments = async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await Comment.find({ task: id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ comments });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addComment,
  getTaskComments
};