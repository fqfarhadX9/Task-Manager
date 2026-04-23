import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { CheckCircle , X} from "lucide-react";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      console.log(err);
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
      navigate("/dashboard");

      } catch (err) {
        console.log(err);
        setError("Something went wrong");
      }
  }

  const handleSendOtp = async () => {
    setLoading(true);
     if (!email) {
      setError("Please enter email");
      return;
    }
    try {
      const res = await fetch(`http://localhost:8000/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      setStep(2);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async() => {
    setLoading(true);
    if (!otp) {
      setError("Enter OTP");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }

      setResetToken(data.resetToken);
      setStep(3);
      setError("");

    } catch (error) {
      console.log(error);
      setError("OTP verification failed");
    } finally {
      setLoading(false);
    }
  }

  const handleResetPassword = async () => {
    setLoading(true);
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resetToken: resetToken,
          newPassword,
        }),
      });
      
      const data = await res.json();
      
      if(!res.ok) {
        setError(data.message || "Failed to reset password");
        return;
      }

      setShowForgot(false);
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.log(err);
      setError("Failed to reset password");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#080E1A] px-4">
      <div className="w-full max-w-md flex flex-col gap-6">

        {!showForgot && (
          <>
          <h1 className="text-3xl font-bold">
            Sign in to Task Manager
          </h1> 

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => setError("Google Login Failed")}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-gray-700" />
            <span className="text-sm text-gray-400">or</span>
            <div className="flex-1 h-[1px] bg-gray-700" />
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              className="w-full bg-[#080E1A] border border-gray-800 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full bg-[#080E1A] border border-gray-800 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full bg-white hover:bg-blue-100 text-black font-bold transition"
            >
              {loading ? "loading..." : "Sign in"}
            </button>
          </form>

          <button
            onClick={() => setShowForgot(true)} 
            className="w-full py-3 rounded-full border border-gray-800 hover:bg-gray-900 transition">
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
          </>
        )}

        {showForgot && (
          <div className="bg-white dark:bg-gray-950 w-[95%] md:w-[650px] sm:w-[500px] h-[400px] md:h-[600px] sm:h-[450px] p-3 rounded-xl border border-gray-200 dark:border-gray-800">

            {/* LOGO */}
            <div className="relative flex items-center">
              <div className="text-left">
                <X size={22} className="text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full" onClick={() => setShowForgot(false)} />
              </div>
              <div className="absolute left-1/2 transform -translate-x-1/2 w-9 h-9 rounded-lg bg-blue-400 font-bold flex items-center justify-center text-white">
                ✓
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold mb-2 pl-16 mt-8">
              Find your account
            </h2>

            <p className="text-sm md:text-base text-gray-400 text-center pl-16 pr-16">
             Enter the email or phone number associated with your account to change your password.
            </p>

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[200px] md:w-[480px] ml-16 mr-16 mt-6 bg-white dark:bg-[#020617] border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 rounded-lg px-3 py-2 md:py-4 text-sm"
                />

                {error && (
                  <p className="text-red-500 text-sm mt-3 text-center">
                    {error}
                  </p>
                )}

                 <button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-[200px] md:w-[480px] ml-16 mr-16 mt-20 md:mt-[260px] bg-blue-400 hover:bg-blue-500 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 rounded-full px-3 py-2 md:py-4 text-sm"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>

              </>
            )}

            {step === 2 && (
              <>
                <input
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-[200px] md:w-[480px] ml-16 mr-16 mt-6 bg-white dark:bg-[#020617] border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 rounded-lg px-3 py-2 md:py-4 text-sm"
                />

                {error && (
                  <p className="text-red-500 text-sm mt-3 text-center">
                    {error}
                  </p>
                )}

                <button 
                  onClick={handleVerifyOtp} 
                  disabled={loading}
                  className="w-[200px] md:w-[480px] ml-16 mr-16 mt-20 md:mt-[260px] bg-blue-400 hover:bg-blue-500 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 rounded-full px-3 py-2 md:py-4 text-sm">
                  {loading ? "Verifying OTP..." : "Verify OTP"}
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-[200px] md:w-[480px] ml-16 mr-16 mt-6 bg-white dark:bg-[#020617] border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 rounded-lg px-3 py-2 md:py-4 text-sm"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-[200px] md:w-[480px] ml-16 mr-16 mt-6 bg-white dark:bg-[#020617] border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 rounded-lg px-3 py-2 md:py-4 text-sm"
                />

                {error && (
                  <p className="text-red-500 text-sm mt-3 text-center">
                    {error}
                  </p>
                )}

                <button 
                  onClick={handleResetPassword} 
                  disabled={loading}
                  className="w-[200px] md:w-[480px] ml-16 mr-16 mt-7 md:mt-[180px] bg-blue-400 hover:bg-blue-500 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 rounded-full px-3 py-2 md:py-4 text-sm"
                >
                  {loading ? "Resetting Password..." : "Reset Password"}
                </button>
              </>
            )}
            
          </div>
        )}

      </div>
    </div>
  );
};

export default Login;
