import { BrowserRouter, Routes, Route } from "react-router-dom";

import TaskList from "../pages/TaskList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import CreateTask from "../pages/CreateTask";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 📊 MAIN */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/create-task" element={<CreateTask />} />

        {/* 🏠 DEFAULT */}
        <Route path="/" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}