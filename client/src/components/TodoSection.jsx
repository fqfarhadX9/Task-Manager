import TodoItem from "./TodoItem";

const TodoSection = ({
  title = "Checklist",
  todos = [],
  newTodo,
  setNewTodo,
  onAdd,
  onToggle,
  onDelete,
  disabled = false,
  completedCount = 0,
}) => {
  return (
    <div className="bg-gray-800/60 border border-gray-700 p-6 rounded-2xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="text-lg uppercase font-semibold tracking-tight">
          {title}
        </h2>

        {todos.length > 0 && (
          <span className="text-sm text-gray-400">
            {completedCount} of {todos.length} completed
          </span>
        )}
      </div>

      {/* Add Todo */}
      <div className="flex gap-3 mb-6 flex-col sm:flex-row">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a todo..."
          className="flex-1 bg-gray-700/60 border border-gray-600 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
        />

        <button
          onClick={onAdd}
          disabled={disabled}
          className={`px-6 py-3 rounded-xl font-medium transition
            ${
              disabled
                ? "bg-gray-600 cursor-not-allowed"
                :  "bg-white text-black hover:bg-gray-200"
            }`}
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-3">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-sm italic">
            No todos yet
          </p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={() => onToggle(todo._id)}
              onDelete={() => onDelete(todo._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoSection;