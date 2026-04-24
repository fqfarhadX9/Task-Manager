import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminJoinCode, setAdminJoinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
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

        setTimeout(() => {
          setError("");
        }, 3000);

        return;
      }

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      const res = await fetch("http://localhost:8000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      login(data.user, data.token);
      navigate("/admin-join-code");

      } catch (err) {
        console.log(err);
        setError("Something went wrong");
      }
  }


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#080E1A] px-4">
      <div className="w-full max-w-md flex flex-col gap-6">

        <h1 className="text-3xl font-bold">
          Create your account
        </h1>

        <GoogleLogin 
          size={22} 
          onSuccess={handleGoogleLogin}
          onError={() => setError("Google Login Failed")}
         />

        <div className="flex items-center gap-3">
          <div className="flex-1 h-[1px] bg-gray-700" />
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-[1px] bg-gray-700" />
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-[#080E1A] border border-gray-800 rounded-md 
                       px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-[#080E1A] border border-gray-800 rounded-md 
                       px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-[#080E1A] border border-gray-800 rounded-md 
                       px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="text"
            placeholder="Admin join code (optional)"
            className="w-full bg-[#080E1A] border border-gray-800 rounded-md 
            px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
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
                       font-bold hover:bg-blue-100 transition 
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
