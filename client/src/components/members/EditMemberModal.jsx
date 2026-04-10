import { useEffect, useState } from "react";
import axios from "../../api/axios.js";
import { X } from "lucide-react";

const EditMemberModal = ({ member, onClose, refresh }) => {

  const [formData, setFormData] = useState({
    name: member.name,
    email: member.email,
    role: member.role,
    position: member.position,
    status: member.status,
    bio: member.bio || "",
    skills: member.skills || [],
    shedule: member.shedule || "office",
    phone: member.phone || "",
    location: member.location || ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
    try {
      const {data} = await axios.put(`/user/${member._id}`, formData);
      refresh();
      onClose(data.updatedUser);
    } catch (err) {
      console.log(err);
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
        if(prev.skills.find(s => s.name === skill)) {
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

    useEffect(() => {
      setFormData(prev => ({
        ...prev,
        skills: []
      }))
    }, [formData.position])

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-start overflow-y-auto py-10">

      <div className="bg-white dark:bg-[#020617] p-6 rounded-xl w-[500px] overflow-y-auto max-h-[90vh]">

        <div className="flex justify-between mb-4 text-black dark:text-white ">
          <h2>Edit Member</h2>
          <X onClick={onClose} className="cursor-pointer hover:text-red-400" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="text-sm text-gray-500">Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 dark:bg-[#020617] border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="col-span-1">
            <label className="text-sm text-gray-500">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 dark:bg-[#020617] border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="col-span-1">
            <label className="text-sm text-gray-500">Phone Number</label>
            <input
              type="number"
              placeholder="Enter phone number"
              className="w-full mt-1 dark:bg-[#020617] border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="col-span-1">
            <label className="text-sm text-gray-500">Location</label>
            <input
              type="text"
              placeholder="Enter location"
              className="w-full mt-1 dark:bg-[#020617] border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Access Level</label>
            <select 
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mt-1 dark:bg-[#020617] border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm">
              <option value="user">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-500">Status</label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mt-1 dark:bg-[#020617] border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm">
              <option value="active">Active</option>
              <option value="away">Away</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm text-gray-500">Schedule</label>
            <select 
              name="shedule"
              value={formData.shedule}
              onChange={handleChange}
              className="w-full mt-1 dark:bg-[#020617] border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm">
              <option value="office">Office</option>
              <option value="remote">Remote</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-500">Role</label>
            <select
              name="position" 
              value={formData.position}
              onChange={handleChange}
              className="w-full mt-1 dark:bg-[#020617] border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm">
                <option>Select role</option>
                <option>Developer</option>
                <option>Designer</option>
                <option>Marketer</option>
                <option>Tester</option>
            </select>
          </div>

          {formData.position && skillOptions[formData.position] && (
            <div className="col-span-2">
              <label className="text-sm text-gray-500">Skills</label>

              <div className="flex flex-wrap gap-2 mt-2">

                {skillOptions[formData.position].map((skill, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => handleSkillChange(skill)}
                    className={`px-3 py-1 text-xs rounded-full border 
                      ${formData.skills.some(s => s.name === skill)
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 hover:bg-blue-300 text-black dark:text-white"
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
              <label className="text-sm text-gray-500">Skill Levels</label>

              {formData.skills.map((skill, i) => (
                <div key={i} className="mt-3">

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-800 dark:text-white">{skill.name}</span>
                    <span className="text-gray-800 dark:text-white">{skill.level}%</span>
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
            <label className="text-sm text-gray-500">Bio</label>
            <textarea
              name="bio"
              placeholder="Tell us about the member..."
              className="w-full mt-1 dark:bg-[#020617] border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg px-3 py-2 text-sm h-20"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>


        </div>

        <button
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-3 w-full mt-2 font-semibold rounded"
        >
          Update
        </button>

      </div>
    </div>
  );
};

export default EditMemberModal;