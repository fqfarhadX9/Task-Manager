const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:shadow-lg transition duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xl text-black dark:text-gray-200">{title}</p>
          <h2 className="text-2xl font-bold text-black dark:text-white mt-1">
            {value}
          </h2>
        </div>

        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${color}-600/20 text-${color}-400`}>
          {icon}
        </div>
      </div>

    </div>
  );
};

export default StatsCard;