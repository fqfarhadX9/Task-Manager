import axios from "../../api/axios.js";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddMemberModal = ({ setShowAddMember, fetchMembers }) => {
  const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "user",
        position: "",
        status: "active",
        shedule: "office",
        bio: "",
        skills: [],
        phone: "",
        location: ""
    });

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    
    setFormData((formData) => {
      const updated = {...formData, [e.target.name]: value};

      if(name === "position") {
        updated.skills = [];
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {

      const {data} = await axios.post("/user",
      formData,
      );
      fetchMembers();
      toast.success(data?.message || "User added successfully 🎉");
      setShowAddMember(false);
      setFormData({
        name:"",
        email:"",
        role:"user",
        position:"",
        status:"active",
        shedule:"office",
        bio:"",
        skills: [],
        phone: "",
        location: ""
      });

    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const skillOptions = {
    Developer: ["React", "Node", "MongoDB", "JavaScript", "Typescript", "Python", "Django", "PostgreSQL", "GraphQl", "AWS"],
    Designer: ["Figma", "UI/UX", "Photoshop", "Illustration", "Product Design", "Animation" ],
    Marketer: ["SEO", "Ads", "Content Marketing", "Social Media", "Market Research", "Content Strategy", "Analytics", "Email Marketing"],
    Tester: ["Manual Testing", "Automation", "Test Case Design", "Bug Identification", "CI/CD", "Postman", "JIRA"]
  };

  const handleSkillChange = (skill) => {
    setFormData(prev => {
      const exists = prev.skills.find(s => s.name === skill);
      if(exists) {
        return {
          ...prev,
          skills: prev.skills.filter(s => s.name !== skill)
        }
      } else {
        return {
          ...prev,
          skills: [...prev.skills,
            {name: skill, level: 50}
          ]
        }
      }
    })
  }


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-y-auto py-10">

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-950 w-[520px] overflow-y-auto max-h-[90vh] rounded-xl border border-gray-200 dark:border-gray-800 p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Add New Member
          </h2>

          <button
            onClick={() => setShowAddMember(false)}
            className="text-gray-400 hover:text-red-600 transition"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-6">
          Add a new member to your team.
        </p>

        <div className="grid grid-cols-2 gap-4">

          <div className="col-span-1">
            <label className="text-sm text-gray-400">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full mt-1 bg-white dark:bg-gray-950 text-black dark:text-white border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:-border-blue-400 rounded-lg px-3 py-2 text-sm"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-1">
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              placeholder="john@email.com"
              className="w-full mt-1 bg-white dark:bg-gray-950 text-black dark:text-white border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:-border-blue-400 rounded-lg px-3 py-2 text-sm"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-1">
            <label className="text-sm text-gray-400">Phone Number</label>
            <input
              type="number"
              placeholder="Enter phone number"
              className="w-full mt-1 bg-white dark:bg-gray-950 text-black dark:text-white border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:-border-blue-400 rounded-lg px-3 py-2 text-sm"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-1">
            <label className="text-sm text-gray-400">Location</label>
            <input
              type="text"
              placeholder="Enter location"
              className="w-full mt-1 bg-white dark:bg-gray-950 text-black dark:text-white border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:-border-blue-400 rounded-lg px-3 py-2 text-sm"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Access Level</label>
            <select 
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mt-1 bg-white dark:bg-gray-950 text-black dark:text-white border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:-border-blue-400 rounded-lg px-3 py-2 text-sm">
              <option value="user">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400">Status</label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mt-1 bg-white dark:bg-gray-950 text-black dark:text-white border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:-border-blue-400 rounded-lg px-3 py-2 text-sm">
              <option value="active">Active</option>
              <option value="away">Away</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400">Schedule</label>
            <select 
              name="shedule"
              value={formData.shedule}
              onChange={handleChange}
              className="w-full mt-1 bg-white dark:bg-gray-950 text-black dark:text-white border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:-border-blue-400 rounded-lg px-3 py-2 text-sm">
              <option value="office">Office</option>
              <option value="remote">Remote</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400">Position</label>
            <select
                name="position" 
                value={formData.position}
                onChange={handleChange}
                className="w-full mt-1 bg-white dark:bg-gray-950 text-black dark:text-white border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:-border-blue-400 rounded-lg px-3 py-2 text-sm">
                    <option value="">Select Position</option>
                    <option>Developer</option>
                    <option>Designer</option>
                    <option>Marketer</option>
                    <option>Tester</option>
            </select>
          </div>

          {formData.position && skillOptions[formData.position] && (
            <div className="col-span-2">
              <label className="text-sm text-gray-400">Skills</label>

              <div className="flex flex-wrap gap-2 mt-2">

                {skillOptions[formData.position].map((skill, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => handleSkillChange(skill)}
                    className={`px-3 py-1 text-xs rounded-full border 
                      ${formData.skills.some(s => s.name === skill)
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border border-gray-200 dark:border-gray-800 text-black dark:text-white hover:bg-blue-300 dark:hover:bg-gray-900/50"
                      }`}
                  >
                    {skill}
                  </button>
                ))}

              </div>
            </div>
          )}

          {formData.skills.length > 0 && (
            <div className="col-span-2 mt-4">
              <label className="text-sm text-gray-400">Skill Levels</label>

              {formData.skills.map((skill, i) => (
                <div key={i} className="mt-3">

                  <div className="flex justify-between text-sm text-black dark:text-white">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) => {
                      const updated = [...formData.skills];
                      updated[i].level = Number(e.target.value);
                      setFormData({ ...formData, skills: updated });
                    }}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="col-span-2">
            <label className="text-sm text-gray-400">Bio (Optional)</label>
            <textarea
              name="bio"
              placeholder="Tell us about the member..."
              className="w-full mt-1 bg-white dark:bg-gray-950 text-black dark:text-white border border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:-border-blue-400 rounded-lg px-3 py-2 text-sm h-20"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => setShowAddMember(false)}
            className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-800 text-black dark:text-white hover:bg-blue-100 dark:hover:bg-gray-900/50 rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading} 
            className="px-4 py-2 text-sm bg-blue-400 hover:bg-blue-500 rounded-lg text-white"
          > 
            {loading ? "Adding..." : "Add member"}
          </button>

        </div>

      </form>

    </div>
  );
};

export default AddMemberModal;