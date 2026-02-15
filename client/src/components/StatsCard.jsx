const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 w-full">
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
};

export default StatsCard;
