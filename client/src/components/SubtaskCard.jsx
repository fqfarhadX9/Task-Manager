import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import TodoSection from "./TodoSection";

const SubtaskCard = ({
  subtask,
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
  const [isOpen, setIsOpen] = useState(false);

  const completedTodos =
    subtask?.todoChecklist?.filter((t) => t.completed).length || 0;

  return (
    <div className="bg-gray-900/60 border border-gray-700 p-4 sm:p-6 rounded-2xl mb-4 hover:border-blue-500 transition-all duration-300">

      {/* EDIT MODE */}
      {editingSubtaskId === subtask._id ? (
        <div className="flex flex-col gap-3 w-full">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="bg-gray-700 px-3 py-2 rounded-lg"
          />
          <input
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            className="bg-gray-700 px-3 py-2 rounded-lg"
          />
          <div className="flex gap-3">
            <button
              onClick={() => handleUpdateSubtask(subtask._id)}
              className="px-3 py-1 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600/30 transition text-xs"
            >
              Save
            </button>
            <button
              onClick={() => setEditingSubtaskId(null)}
              className="px-3 py-1 rounded-lg bg-gray-600/20 text-gray-400 hover:bg-gray-600/30 transition text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div className="flex justify-between items-start gap-4 mb-2">

            {/* CLICKABLE TITLE AREA ONLY */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex-1 cursor-pointer"
            >
              <h3 className="text-lg font-semibold tracking-wide flex items-center gap-2">
                <span className="text-blue-400">
                  {isOpen ? "▼" : "▶"}
                </span>
                {subtask.title}
              </h3>
            </div>

            {/* ACTION BUTTONS (NO TOGGLE HERE) */}
            <div className="flex gap-3 text-xs">
              <button
                onClick={() => handleEditSubtask(subtask)}
                className="px-3 py-1 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteSubtask(subtask._id)}
                className="text-red-400 hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </div>

          {/* COLLAPSIBLE CONTENT */}
          {isOpen && (
            <>
              <div className="mt-2 max-w-sm">
                <ProgressBar value={subtask.progress} />
              </div>

              <p className="text-sm text-gray-400 mt-2">
                {subtask.description}
              </p>

              <div className="mt-4">
                <TodoSection
                  title="Subtask Todos"
                  todos={subtask.todoChecklist || []}
                  newTodo={subtaskInput[subtask._id] || ""}
                  completedCount={completedTodos}
                  setNewTodo={(value) =>
                    setSubtaskInput({
                      ...subtaskInput,
                      [subtask._id]: value,
                    })
                  }
                  onAdd={() => handleAddSubtaskTodo(subtask._id)}
                  onToggle={(todoId) =>
                    handleToggleSubtaskTodo(subtask._id, todoId)
                  }
                  onDelete={(todoId) =>
                    handleDeleteSubtaskTodo(subtask._id, todoId)
                  }
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SubtaskCard;