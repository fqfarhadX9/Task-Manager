const canModifyTask = (task, user) => {
  const isCreator =
    task.createdBy.toString() === user._id.toString();

  const isAssigned =
      (task.assignedTo || [])
        .map(id => id.toString())
        .includes(user._id.toString());

  const isAdmin = user.role === "admin";

  return isCreator || isAssigned || isAdmin;
};

module.exports = { canModifyTask };