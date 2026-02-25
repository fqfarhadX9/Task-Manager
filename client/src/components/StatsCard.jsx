const StatsCard = ({ title, value }) => {
  return (
    <div className="group bg-gray-900/60 backdrop-blur-sm border border-gray-800 hover:border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      
      <p className="text-sm text-gray-400 tracking-wide">
        {title}
      </p>

      <h2 className="text-3xl font-semibold mt-3 text-white group-hover:text-gray-200 transition">
        {value}
      </h2>

    </div>
  );
};

export default StatsCard;