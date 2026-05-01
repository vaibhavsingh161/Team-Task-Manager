import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/projects").then((res) => setProjects(res.data));
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      <div className="grid gap-4">
        {projects.map((p) => (
          <div
            key={p._id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h2 className="font-bold text-lg">{p.name}</h2>
            <p className="text-gray-600">{p.description}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}