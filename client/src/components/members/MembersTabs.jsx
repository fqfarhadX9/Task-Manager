const tabs = [
  { label: "All Members", value: "all" },
  { label: "Developers", value: "developer" },
  { label: "Designers", value: "designer" },
  { label: "Marketers", value: "marketer" },
  { label: "Tester", value: "tester" },
];

const MembersTabs = ({ positionFilter, setPositionFilter }) => {

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">

      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setPositionFilter(tab.value)}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition
            ${
              positionFilter === tab.value
                ? "bg-white dark:bg-gray-950 text-black dark:text-white border border-gray-200 dark:border-gray-800"
                : "text-gray-400 hover:bg-blue-400 hover:text-white"
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