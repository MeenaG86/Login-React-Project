import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const savedEmail = localStorage.getItem("rememberedEmail");

    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    if (isLoggedIn === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  function validateForm() {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleLogin(e) {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) {
      toast.error("Please fill all fields correctly");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", response.data.user.email);

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        toast.success("Login successful");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      setServerError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1600&q=80')",
        }}
      ></div>

      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="px-4 sm:px-8 md:px-14 pt-6">
          <h1 className="text-red-600 text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide">
            NETFLIX
          </h1>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
          <div className="w-full max-w-md bg-black/75 rounded-md px-6 py-8 sm:px-10 sm:py-10 md:px-12">
            <h2 className="text-3xl font-bold mb-8">Sign In</h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Email or mobile number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 rounded bg-zinc-700 text-white outline-none border border-zinc-600 focus:border-white text-sm sm:text-base"
                />
                {errors.email && (
                  <p className="text-orange-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 pr-14 rounded bg-zinc-700 text-white outline-none border border-zinc-600 focus:border-white text-sm sm:text-base"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-orange-400 text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {serverError && (
                <p className="bg-orange-500/20 border border-orange-500 text-orange-300 text-sm p-3 rounded">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="text-center text-zinc-400 text-sm">OR</div>

              <button
                type="button"
                className="w-full bg-zinc-700 hover:bg-zinc-600 transition py-3 rounded font-medium"
              >
                Use a Sign-In Code
              </button>

              <p className="text-center text-sm text-zinc-300 cursor-pointer hover:underline">
                Forgot password?
              </p>

              <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>

                <span className="hover:underline cursor-pointer">Need help?</span>
              </div>
            </form>

            <div className="mt-10 text-zinc-400 text-sm">
              New to Netflix?{" "}
              <span className="text-white hover:underline cursor-pointer">
                Sign up now
              </span>
            </div>

            <p className="mt-4 text-xs text-zinc-500 leading-5">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.
            </p>
          </div>
        </main>

        <footer className="relative z-10 bg-black/80 text-zinc-400 px-6 sm:px-10 md:px-20 py-8 mt-6">
          <p className="mb-6 text-sm">Questions? Call 000-800-919-1694</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
            <p className="hover:underline cursor-pointer">FAQ</p>
            <p className="hover:underline cursor-pointer">Help Centre</p>
            <p className="hover:underline cursor-pointer">Terms of Use</p>
            <p className="hover:underline cursor-pointer">Privacy</p>
            <p className="hover:underline cursor-pointer">Cookie Preferences</p>
            <p className="hover:underline cursor-pointer">Corporate Information</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Login;