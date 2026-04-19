const DotMenu = ({onEdit, onDeleteClick, setShowMenu}) => {
  return (
    <div className="relative">
    
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          
          <button
            onClick={() => {
              onEdit();
              setShowMenu(false);
            }}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900/50"
          >
            Edit
          </button>

          <button
            onClick={() => {
              onDeleteClick();
              setShowMenu(false)
            }}
            className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Delete
          </button>
        </div>

    </div>
  );
};

export default DotMenu;