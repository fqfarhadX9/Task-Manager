// 🔹 Calculate progress for a checklist
const calculateChecklistProgress = (checklist) => {
  if (!checklist || checklist.length === 0) {
    return 0;
  }

  const completedCount = checklist.filter(
    (item) => item.completed
  ).length;

  return Math.round(
    (completedCount / checklist.length) * 100
  );
};

// 🔹 Update subtask progress + status
const updateSubtaskProgress = (subtask) => {
  const progress = calculateChecklistProgress(
    subtask.todoChecklist
  );

  subtask.progress = progress;

  if (progress === 100) {
    subtask.status = "completed";
  } else if (progress > 0) {
    subtask.status = "in_progress";
  } else {
    subtask.status = "pending";
  }
};

// 🔹 Update task progress + status
const updateTaskProgress = (task) => {
  // If subtasks exist → derive from subtasks
  if (task.subtasks && task.subtasks.length > 0) {
    const totalSubtaskProgress = task.subtasks.reduce(
      (sum, subtask) => sum + subtask.progress,
      0
    );

    task.progress = Math.round(
      totalSubtaskProgress / task.subtasks.length
    );
  } else {
    // Else derive from task-level todos
    task.progress = calculateChecklistProgress(
      task.todoChecklist
    );
  }

  if (task.progress === 100) {
    task.status = "completed";
  } else if (task.progress > 0) {
    task.status = "in_progress";
  } else {
    task.status = "pending";
  }
};


module.exports = {
  updateSubtaskProgress,
  updateTaskProgress,
};