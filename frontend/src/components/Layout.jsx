import { useContext } from "react";
import { Folder } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ListTodo, PlusCircle, LogOut } from "lucide-react";

export default function Layout({ children }) {
  const { logout } = useContext(AuthContext);
  ;

  const location = useLocation();
  const role = localStorage.getItem("role"); // ✅ THIS LINE


  const navItem = (path, label, Icon) => {
    const active = location.pathname === path;

    // import { Folder } from "lucide-react";

    return (
      <Link
        to={path}
        className={`flex items-center gap-3 p-3 rounded-lg transition 
        ${
          active
            ? "bg-blue-600 text-white"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`}
      >
        <Icon size={18} />
        {label}
      </Link>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5 flex flex-col shadow-lg">
        <h2 className="text-2xl font-bold mb-8 tracking-wide">Task Manager</h2>

        <nav className="flex flex-col gap-2">
          {navItem("/dashboard", "Dashboard", LayoutDashboard)}
          {navItem("/tasks", "Tasks", ListTodo)}

          {/* 🔥 ONLY ADMIN */}
          {role === "admin" && (
            <>
              {navItem("/create-task", "Create Task", PlusCircle)}
              {navItem("/projects", "Projects", Folder)}
            </>
          )}
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-2 bg-red-500 hover:bg-red-600 p-3 rounded-lg transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">{children}</div>
    </div>
  );
}
