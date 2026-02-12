const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },

    dueDate: { type: Date },

    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    attachments: [String],

    todoChecklist: [todoSchema],

    progress: { type: Number, default: 0 },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// auto progress calculation
taskSchema.pre("save", function (next) {
  if (this.todoChecklist.length === 0) {
    this.progress = 0;
  } else {
    const completed = this.todoChecklist.filter(t => t.completed).length;
    this.progress = Math.round(
      (completed / this.todoChecklist.length) * 100
    );
  }
  next();
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task
