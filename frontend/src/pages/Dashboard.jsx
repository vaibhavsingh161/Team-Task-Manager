import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get("/tasks");

        const tasks = res.data;

        const stats = {
          total: tasks.length,
          completed: tasks.filter((t) => t.status === "done").length,
          pending: tasks.filter((t) => t.status !== "done").length,

          // ✅ ADD THIS
          overdue: tasks.filter(
            (t) =>
              t.deadline &&
              new Date(t.deadline) < new Date() &&
              t.status !== "done",
          ).length,
        };

        setData(stats);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDashboard();
  }, []);

  if (!data) {
    return (
      <Layout>
        <p className="text-gray-500">Loading dashboard...</p>
      </Layout>
    );
  }

  return (
  <Layout>
    {/* Header */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Dashboard
      </h1>
      <span className="text-sm text-gray-500">
        Welcome back 👋
      </span>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

      {/* Total */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow hover:scale-105 transition">
        <p className="text-sm opacity-80">Total Tasks</p>
        <h2 className="text-3xl font-bold mt-2">{data.total}</h2>
      </div>

      {/* Completed */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow hover:scale-105 transition">
        <p className="text-sm opacity-80">Completed</p>
        <h2 className="text-3xl font-bold mt-2">{data.completed}</h2>
      </div>

      {/* Pending */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-xl shadow hover:scale-105 transition">
        <p className="text-sm opacity-80">Pending</p>
        <h2 className="text-3xl font-bold mt-2">{data.pending}</h2>
      </div>

      {/* 🔥 Overdue (FIXED CLEAN) */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-xl shadow hover:scale-105 transition">
        <p className="text-sm opacity-80">Overdue</p>
        <h2 className="text-3xl font-bold mt-2">{data.overdue}</h2>
      </div>

    </div>

    {/* Overview Section */}
    <div className="mt-10 bg-white p-6 rounded-xl shadow border">
      <h2 className="text-lg font-semibold mb-2">
        Overview
      </h2>
      <p className="text-gray-600 text-sm">
        Track your tasks, monitor progress, and stay productive.
      </p>
    </div>

  </Layout>
);
}
