import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      console.log("TASKS:", res.data);
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    console.log("CLICKED", id, status);

    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks(); // refresh after update
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">Tasks</h2>

      <div className="grid gap-4">
        {tasks.map((task) => {
          // ✅ FIXED: logic must be inside block
          const isOverdue =
            task.deadline && new Date(task.deadline) < new Date();

          return (
            <div
              key={task._id}
              className="p-4 bg-white shadow rounded border"
            >
              <h3 className="text-lg font-semibold">{task.title}</h3>

              <p className="text-gray-600">{task.description}</p>

              <p className="text-sm mt-2">
                📁 Project: {task.projectId?.name}
              </p>

              {/* ✅ DEADLINE */}
              <p className="text-sm mt-1">
                📅 Deadline:{" "}
                {task.deadline
                  ? new Date(task.deadline).toLocaleDateString()
                  : "No deadline"}
              </p>

              {/* ✅ OVERDUE WARNING */}
              {isOverdue && task.status !== "done" && (
                <p className="text-red-500 font-semibold">
                  ⚠️ Overdue
                </p>
              )}

              {/* STATUS */}
              <p className="mt-2">
                Status:
                <span
                  className={`ml-2 px-2 py-1 rounded text-white ${
                    task.status === "done"
                      ? "bg-green-500"
                      : task.status === "in-progress"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                  }`}
                >
                  {task.status}
                </span>
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => updateStatus(task._id, "todo")}
                  className="px-3 py-1 bg-gray-500 text-white rounded"
                >
                  Todo
                </button>

                <button
                  onClick={() =>
                    updateStatus(task._id, "in-progress")
                  }
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  In Progress
                </button>

                <button
                  onClick={() => updateStatus(task._id, "done")}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  Done
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}