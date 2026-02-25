import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminJoinCode, setAdminJoinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, adminJoinCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      navigate("/login");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-100 px-4">
      <div className="w-full max-w-md flex flex-col gap-6">

        <h1 className="text-3xl font-bold">
          Create your account
        </h1>

        <button
          className="flex items-center justify-center gap-3 w-full py-3 
                     rounded-full bg-white text-black font-semibold 
                     hover:bg-gray-200 transition"
        >
          <FcGoogle size={22} />
          Sign in with Google
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-[1px] bg-gray-700" />
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-[1px] bg-gray-700" />
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-gray-700/60 border border-gray-600 rounded-md 
                       px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-gray-700/60 border border-gray-600 rounded-md 
                       px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-700/60 border border-gray-600 rounded-md 
                       px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="text"
            placeholder="Admin join code (optional)"
            className="w-full bg-gray-700/60 border border-gray-600 rounded-md 
            px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition"
            value={adminJoinCode}
            onChange={(e) => setAdminJoinCode(e.target.value)}
         />

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-white text-black 
                       font-bold hover:bg-gray-200 transition 
                       disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;
