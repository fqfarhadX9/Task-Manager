import axios from "../../api/axios.js";
import { X } from "lucide-react";
import { useState } from "react";

const AddMemberModal = ({ setShowAddMember, fetchMembers }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "user",
        position: "",
        isActive: true,
        bio: ""
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {

        try {

            await axios.post("/user",
            formData,
            );
            fetchMembers();
            alert("Member added");
            setShowAddMember(false);
            setFormData({
                name:"",
                email:"",
                role:"user",
                position:"",
                status:"active",
                bio:""
            });

        } catch (error) {
            console.log(error);
        }

    };
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-[#0F172A] w-[520px] rounded-xl border border-gray-700 p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">
            Add New Member
          </h2>

          <button
            onClick={() => setShowAddMember(false)}
            className="text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-6">
          Add a new member to your team.
        </p>

        <div className="grid grid-cols-2 gap-4">

          <div className="col-span-1">
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full mt-1 bg-[#020617] border border-gray-700 rounded-lg px-3 py-2 text-sm"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-1">
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="john@email.com"
              className="w-full mt-1 bg-[#020617] border border-gray-700 rounded-lg px-3 py-2 text-sm"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Role</label>
            <select
                name="position" 
                value={formData.position}
                onChange={handleChange}
                className="w-full mt-1 bg-[#020617] border border-gray-700 rounded-lg px-3 py-2 text-sm">
                    <option>Select role</option>
                    <option>Developer</option>
                    <option>Designer</option>
                    <option>Marketer</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-300">Access Level</label>
            <select 
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mt-1 bg-[#020617] border border-gray-700 rounded-lg px-3 py-2 text-sm">
              <option>Member</option>
              <option>Admin</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-300">Status</label>
            <select 
              name="isActive"
              value={formData.isActive}
              onChange={handleChange}
              className="w-full mt-1 bg-[#020617] border border-gray-700 rounded-lg px-3 py-2 text-sm">
              <option>Active</option>
              <option>Away</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="text-sm text-gray-300">Bio (Optional)</label>
            <textarea
              name="bio"
              placeholder="Tell us about the member..."
              className="w-full mt-1 bg-[#020617] border border-gray-700 rounded-lg px-3 py-2 text-sm h-20"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => setShowAddMember(false)}
            className="px-4 py-2 text-sm border border-gray-600 rounded-lg"
          >
            Cancel
          </button>

          <button className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg" onClick={handleSubmit}>
            Add Member
          </button>

        </div>

      </div>

    </div>
  );
};

export default AddMemberModal;