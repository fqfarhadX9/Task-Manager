import SubtaskCard from "./SubtaskCard";

const SubtaskSection = ({
  task,
  newSubtaskTitle,
  setNewSubtaskTitle,
  newSubtaskDesc,
  setNewSubtaskDesc,
  handleCreateSubtask,
  editingSubtaskId,
  setEditingSubtaskId,
  editTitle,
  setEditTitle,
  editDesc,
  setEditDesc,
  handleUpdateSubtask,
  handleDeleteSubtask,
  handleEditSubtask,
  subtaskInput,
  setSubtaskInput,
  handleAddSubtaskTodo,
  handleToggleSubtaskTodo,
  handleDeleteSubtaskTodo,
}) => {
  return (
    <div className="bg-gray-800/60 border border-gray-700 p-4 sm:p-8 rounded-3xl shadow-xl">

      <h2 className="text-lg sm:text-xl font-semibold mb-6 tracking-tight">
        Subtasks
      </h2>

      {/* {totalTodos > 0 && (
          <span className="text-sm text-gray-400">
            {completedTodos} of {totalTodos} completed
          </span>
        )} */}


      {/* Create Subtask */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Subtask title..."
          value={newSubtaskTitle}
          onChange={(e) => setNewSubtaskTitle(e.target.value)}
          className="flex-1 bg-gray-700 border border-gray-600 px-4 py-2 rounded-xl focus:outline-none focus:border-blue-500 transition"
        />
        <input
          type="text"
          placeholder="Description..."
          value={newSubtaskDesc}
          onChange={(e) => setNewSubtaskDesc(e.target.value)}
          className="flex-1 bg-gray-700 border border-gray-600 px-4 py-2 rounded-xl focus:outline-none focus:border-blue-500 transition"
        />
        <button
          onClick={handleCreateSubtask}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl"
        >
          Add
        </button>
      </div>

      {/* Subtask List */}
      {!task?.subtasks || task?.subtasks?.length === 0 ? (
        <p className="text-gray-500 text-sm italic">
          No subtasks yet
        </p>
      ) : (
        task.subtasks.map((subtask) => (
          <SubtaskCard
            key={subtask._id}
            subtask={subtask}
            editingSubtaskId={editingSubtaskId}
            setEditingSubtaskId={setEditingSubtaskId}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editDesc={editDesc}
            setEditDesc={setEditDesc}
            handleUpdateSubtask={handleUpdateSubtask}
            handleDeleteSubtask={handleDeleteSubtask}
            handleEditSubtask={handleEditSubtask}
            subtaskInput={subtaskInput}
            setSubtaskInput={setSubtaskInput}
            handleAddSubtaskTodo={handleAddSubtaskTodo}
            handleToggleSubtaskTodo={handleToggleSubtaskTodo}
            handleDeleteSubtaskTodo={handleDeleteSubtaskTodo}
          />
        ))
      )}
    </div>
  );
};

export default SubtaskSection;