const calculateTaskProgress = (task) => {
  const total = task.todoChecklist.length;

  const completed = task.todoChecklist.filter(
    (todo) => todo.completed
  ).length;

  const progress =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  let status = "pending";

  if (progress === 0) {
    status = "pending";
  } else if (progress < 100) {
    status = "in_progress";
  } else {
    status = "completed";
  }

  return { progress, status };
};

module.exports = calculateTaskProgress;