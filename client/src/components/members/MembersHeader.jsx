import { Search, Filter, Plus } from "lucide-react";

const MembersHeader = ({ search, setSearch, setStatusFilter, setRoleFilter, showFilter, setShowFilter }) => {
  return (
    <div className="flex justify-between items-center">

      <h1 className="text-3xl font-semibold text-white">
        Team Members
      </h1>

      <div className="flex items-center gap-4">

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#1F2937] border border-gray-700 text-sm text-white rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="bg-[#1F2937] border border-gray-700 p-2 rounded-lg hover:bg-gray-800 transition" onClick={() => setShowFilter(!showFilter)}>
          <Filter size={18} className="text-gray-300" />
        </button>

        {showFilter && (
          <div className="absolute right-0 mt-2 w-64 bg-[#111827] border border-gray-700 rounded-xl p-4 shadow-lg z-50">

            {/* Filter By Section */}
            <div className="mb-4">
              <h4 className="text-gray-400 text-sm mb-2">Filter By</h4>

              <div
                onClick={() => setStatusFilter(true)}
                className="flex items-center gap-2 cursor-pointer hover:bg-[#1F2937] p-2 rounded-md"
              >
                🟢 <span>Active Members</span>
              </div>

              <div
                onClick={() => setStatusFilter(false)}
                className="flex items-center gap-2 cursor-pointer hover:bg-[#1F2937] p-2 rounded-md"
              >
                🟡 <span>Away Members</span>
              </div>
            </div>

            {/* Access Level Section */}
            <div>
              <h4 className="text-gray-400 text-sm mb-2">Access Level</h4>

              <div
                onClick={() => setRoleFilter("admin")}
                className="cursor-pointer hover:bg-[#1F2937] p-2 rounded-md"
              >
                Admin
              </div>

              <div
                onClick={() => setRoleFilter("user")}
                className="cursor-pointer hover:bg-[#1F2937] p-2 rounded-md"
              >
                Member
              </div>
            </div>

          </div>
        )}

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          <Plus size={16} />
          Add Member
        </button>

      </div>
    </div>
  );
};

export default MembersHeader;