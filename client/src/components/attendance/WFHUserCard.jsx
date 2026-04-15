export default function WFHUserCard({ user, onToggle, onEdit }) {
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const role = loginUser.role;

  const colors = {
    remote: "bg-green-100 text-green-600",
    office: "bg-blue-100 text-blue-500", 
  };
  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex items-center justify-between">

      <div className="flex items-center gap-4">

        <img
          src={user?.profile}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />

        <div>
          <p className="font-medium text-black dark:text-white">{user.name}</p>

          <div className="flex gap-2 mt-2">
            {user?.days?.map((d) => (
              <span
                key={d}
                className={`border border-gray-200 dark:border-gray-800 px-2 py-1 rounded text-xs ${colors[user.shedule]}`}
              >
                {d}
              </span>
            ))}
          </div>

        </div>

      </div>

      <button
        onClick={() => onToggle(user.userId, user.shedule)}
        className={`text-sm px-3 py-1 rounded-full capitalize ${
          user.shedule === "office"
            ? "bg-blue-500/20 text-blue-400 border border-blue-500"
            : "bg-green-500/20 text-green-400"
        }`}
      >
        {user.shedule}
      </button>

      { role == "admin" && <button
          onClick={() => onEdit(user)}
          className="text-xs border border-gray-200 dark:border-gray-800 text-black dark:text-white px-2 py-1 rounded"
        >
          Edit
        </button>
      }

    </div>
  );
}