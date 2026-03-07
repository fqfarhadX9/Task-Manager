import MembersHeader from "../components/members/MembersHeader";
import MembersTabs from "../components/members/MembersTabs";
import MemberCard from "../components/members/MemberCard";
import MembersPagination from "../components/members/MembersPagination";
import { useEffect, useState } from "react";
import axios from "../api/axios.js";
import MemberDetailsModal from "../components/members/MemberDetailsModal.jsx";

const Members = () => {
    const [users, setUsers] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all"); // active | away   
    const [roleFilter, setRoleFilter] = useState("all"); // admin | member
    const [showFilter, setShowFilter] = useState(false);
    const [showAddMember, setShowAddMember] = useState(false);
    const [positionFilter, setPositionFilter] = useState("all");
    const [selectedMember, setSelectedMember] = useState(null);

    const fetchMembers = async () => {
        try {
          const {data} = await axios.get(`/user?search=${search}&role=${roleFilter}&status=${statusFilter}&position=${positionFilter}&page=${currentPage}`);
          setUsers(data.users);
          setPageInfo({
            page: data.page,  
            totalUsers: data.totalUsers,
            totalPages: data.totalPages,
          });
        } catch (error) {
          console.error("Error fetching members:", error);
        }
    };

    useEffect(() => {
      fetchMembers();
    }, [search, currentPage, roleFilter, statusFilter, positionFilter]);

    useEffect(() => {
      setCurrentPage(1);
    }, [search, roleFilter, statusFilter, positionFilter]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-100 p-6">

      {/* PAGE TITLE + SEARCH + ADD BTN */}
      <MembersHeader 
        search={search} 
        setSearch={setSearch}  
        setStatusFilter={setStatusFilter}
        setRoleFilter={setRoleFilter} 
        showFilter={showFilter} 
        setShowFilter={setShowFilter} 
        showAddMember={showAddMember}
        setShowAddMember={setShowAddMember}
        fetchMembers={fetchMembers}
      />

      {/* MEMBER CATEGORY TABS */}
      <MembersTabs 
        positionFilter={positionFilter}
        setPositionFilter={setPositionFilter}
      />

      {/* MEMBERS GRID SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

       { users?.map((member) => (
          <MemberCard 
            key={member._id} 
            member={member} 
            setSelectedMember={setSelectedMember}/>
        ))}

      </div>

      {/* PAGINATION SECTION */}
      <MembersPagination 
        totalPages={pageInfo.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {selectedMember && (
        <MemberDetailsModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

    </div>
  );
};

export default Members;