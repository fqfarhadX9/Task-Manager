import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminJoinCode() {
  const [adminJoinCode, setAdminJoinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
    if (user?.role === "admin") {
        navigate("/dashboard");
    }

  const handleSubmit = async () => {
    if (!adminJoinCode) return;

    try {
      setLoading(true);
      await axios.post("/auth/verify-admin-code", { adminJoinCode });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid code");
      setTimeout(() => {
            setError("");
        }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 w-auto overflow-y-auto max-h-[90vh]">
      <div className="w-full max-w-md p-6 rounded-2xl bg-[#080E1A] border border-gray-800 shadow-xl">
        <h1 className="text-2xl font-semibold mb-2">
          Join as Admin (Optional)
        </h1>
        
        <p className="text-sm text-gray-400 mb-6">
          Have an invite code? Enter it below to get admin access.
        </p>

        <input
          type="text"
          placeholder="Enter admin invite code"
          value={adminJoinCode}
          onChange={(e) => setAdminJoinCode(e.target.value)}
          className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
        />

        <button
          onClick={handleSubmit}
          disabled={!adminJoinCode || loading}
          className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-lg mb-3 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Continue"}
        </button>
        {error && <p className="text-red-500 text-center text-sm  mb-4">{error}</p>}

        <button
            onClick={() => navigate("/dashboard")}
          className="w-full text-sm text-gray-400 hover:text-white"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}