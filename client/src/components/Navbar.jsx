const Navbar = () => {
  return (
    <nav className="w-full h-14 flex items-center justify-between px-6 border-b border-gray-800">
      <h1 className="text-xl font-bold">TaskManager</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm bg-gray-800 px-3 py-1 rounded-full">
          Admin
        </span>
        <button className="text-sm text-red-400 hover:text-red-500">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
