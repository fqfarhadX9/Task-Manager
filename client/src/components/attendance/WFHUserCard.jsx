export default function WFHUserCard({ user, onToggle, onEdit }) {
  const role = user.role;

  return (
    <div className="bg-[#1E293B] rounded-lg p-4 flex items-center justify-between">

      <div className="flex items-center gap-4">

        <img
          src={user?.profile}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />

        <div>
          <p className="font-medium">{user.name}</p>

          <div className="flex gap-2 mt-2">
            {user?.days?.map((d) => (
              <span
                key={d}
                className="border border-gray-600 px-2 py-1 rounded text-xs"
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
            ? "bg-blue-500/20 text-blue-400"
            : "bg-green-500/20 text-green-400"
        }`}
      >
        {user.shedule}
      </button>

      { role == "admin" && <button
          onClick={() => onEdit(user)}
          className="text-xs border px-2 py-1 rounded"
        >
          Edit
        </button>
      }

    </div>
  );
}