import { useState, useEffect } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function CreateTask() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    projectId: "",
    assignedTo: "",
    deadline: "",
  });

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return (
      <Layout>
        <p className="text-red-500">Access Denied</p>
      </Layout>
    );
  }

  useEffect(() => {
    API.get("/projects")
      .then((res) => {
        console.log("PROJECTS:", res.data);
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    API.get("/users")
      .then((res) => {
        console.log("USERS:", res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("FORM:", form);

    if (!form.title || !form.projectId) {
      alert("Fill all required fields");
      return;
    }

    try {
      const res = await API.post("/tasks", form);
      console.log(res.data);
      alert("Task created");
    } catch (err) {
      console.log(err);
      alert("Error creating task");
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Create Task</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Title"
          className="w-full p-3 border rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Description"
          className="w-full p-3 border rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="date"
          className="w-full p-3 border rounded"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        />

        <select
          className="w-full p-3 border rounded"
          value={form.projectId}
          onChange={(e) => setForm({ ...form, projectId: e.target.value })}
        >
          <option value="">Select Project</option>

          {projects.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          className="w-full p-3 border rounded"
          value={form.assignedTo}
          onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
        >
          <option value="">Assign User</option>

          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.username}
            </option>
          ))}
        </select>

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Task
        </button>
      </form>
    </Layout>
  );
}
