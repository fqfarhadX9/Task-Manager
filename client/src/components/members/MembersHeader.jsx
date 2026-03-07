import {
  Search,
  Filter,
  Plus,
  CheckCircle,
  Clock,
  Shield,
  User
} from "lucide-react";
import AddMemberModal from "./AddMemberModal";

const MembersHeader = ({
  search,
  setSearch,
  setStatusFilter,
  setRoleFilter,
  showFilter,
  setShowFilter,
  showAddMember,
  setShowAddMember
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      {/* TITLE */}
      <h1 className="text-3xl font-semibold text-white">
        Team Members
      </h1>

      <div className="flex items-center gap-3">

        {/* SEARCH */}
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

        {/* FILTER */}
        <div className="relative">

          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 bg-[#1F2937] border border-gray-700 px-3 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Filter size={16} />
            Filter
          </button>

          {showFilter && (
            <div className="absolute right-0 top-12 w-56 bg-[#111827] border border-gray-700 rounded-lg shadow-xl p-3 z-50">

              <p className="text-xs text-gray-400 mb-2">Status</p>

              <div
                onClick={() => {
                  setStatusFilter("true");
                  setShowFilter(false);
                }}
                className="flex items-center gap-2 text-sm cursor-pointer hover:bg-[#1F2937] p-2 rounded-md"
              >
                <CheckCircle size={16} className="text-green-500" />
                Active
              </div>

              <div
                onClick={() => {
                  setStatusFilter("false");
                  setShowFilter(false);
                }}
                className="flex items-center gap-2 text-sm cursor-pointer hover:bg-[#1F2937] p-2 rounded-md"
              >
                <Clock size={16} className="text-yellow-400" />
                Away
              </div>

              <div className="border-t border-gray-700 my-2"></div>

              <p className="text-xs text-gray-400 mb-2">Access</p>

              <div
                onClick={() => {
                  setRoleFilter("admin");
                  setShowFilter(false);
                }}
                className="flex items-center gap-2 text-sm cursor-pointer hover:bg-[#1F2937] p-2 rounded-md"
              >
                <Shield size={16} className="text-blue-500" />
                Admin
              </div>

              <div
                onClick={() => {
                  setRoleFilter("user");
                  setShowFilter(false);
                }}
                className="flex items-center gap-2 text-sm cursor-pointer hover:bg-[#1F2937] p-2 rounded-md"
              >
                <User size={16} className="text-gray-400" />
                Member
              </div>

            </div>
          )}

        </div>

        <button 
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          onClick={() => setShowAddMember(true)}>
          <Plus size={16} />
          Add Member
        </button>

        {showAddMember && (
          <AddMemberModal 
            setShowAddMember={setShowAddMember} 
          />
        )}

      </div>
    </div>
  );
};

export default MembersHeader;