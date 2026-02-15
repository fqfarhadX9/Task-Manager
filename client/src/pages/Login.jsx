import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md flex flex-col gap-6">

        <h1 className="text-3xl font-bold">
          Sign in to Task Manager
        </h1>

        <button
          className="flex items-center justify-center gap-3 w-full py-3 
                     rounded-full bg-white text-black font-semibold 
                     hover:bg-gray-200 transition"
        >
          <FcGoogle size={22}/>
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
            placeholder="Email"
            className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-black border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

           {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
           )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition"
          >
            {loading ? "loading..." : "Sign in"}
          </button>
        </form>

        <button className="w-full py-3 rounded-full border border-gray-600 hover:bg-gray-900 transition">
          Forgot password?
        </button>

        <p className="text-sm text-gray-400">
          Don’t have an account?{" "}
            <Link
             to="/sign-up"
             className="text-blue-500 font-medium hover:underline"
            >
              Sign up
            </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
