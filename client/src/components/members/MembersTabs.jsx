const tabs = [
  { label: "All Members", value: "all" },
  { label: "Developers", value: "developer" },
  { label: "Designers", value: "designer" },
  { label: "Marketers", value: "marketer" },
];

const MembersTabs = ({ positionFilter, setPositionFilter }) => {

  return (
    <div className="flex gap-4 mt-8">

      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setPositionFilter(tab.value)}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition
            ${
              positionFilter === tab.value
                ? "bg-[#1F2937] text-white border border-gray-700"
                : "text-gray-400 hover:text-white"
            }
          `}
        >
          {tab.label}
        </button>
      ))}

    </div>
  );
};

export default MembersTabs;