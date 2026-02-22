import React from "react";

const ProgressBar = ({ value }) => {
  const getColor = () => {
    if (value <= 40) return "bg-red-500";
    if (value <= 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="w-full">
      <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-3 ${getColor()} transition-all duration-500`}
          style={{ width: `${value}%` }}
        ></div>
      </div>

      <div className="text-xs text-gray-400 mt-1 text-right">
        {value}%
      </div>
    </div>
  );
};

export default ProgressBar;