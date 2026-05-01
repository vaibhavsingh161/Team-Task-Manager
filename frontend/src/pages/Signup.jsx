import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", {
        ...form,
        role, // ✅ role sent
      });

      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Account 🚀
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border rounded"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* 🔥 ROLE DROPDOWN */}
          <select
            className="w-full p-3 border rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">Member</option>
            <option value="admin">Admin</option>
          </select>

          <button className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}