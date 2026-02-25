const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-gray-900/60 border border-gray-700 p-4 rounded-xl">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="w-4 h-4 accent-blue-500 cursor-pointer flex-shrink-0"
        />

        <span
          className={`text-sm truncate ${
            todo.completed
              ? "line-through text-gray-500"
              : "text-gray-200"
          }`}
        >
          {todo.text}
        </span>
      </div>

      <button
        onClick={onDelete}
        className="text-red-400 hover:text-red-300 text-sm ml-4 flex-shrink-0"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;