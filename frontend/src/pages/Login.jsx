import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ basic validation
    if (!form.email || !form.password) {
      return setError("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      // ✅ store token + role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      login(res.data.token);

      alert(`Login successful as ${res.data.role}`);

      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
          Welcome Back 👋
        </h2>

        <p className="text-center text-gray-500 text-sm mb-6">
          Login to your account
        </p>

        {/* ❌ Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            disabled={loading}
            className={`w-full py-3 rounded text-white transition ${
              loading
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}