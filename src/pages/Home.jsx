import { useState } from "react";
import {
  Menu,
  X,
  Bell,
  CheckCircle,
  FileText,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Home() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Intimation", path: "/intimation", icon: Bell },
    { label: "Line Clearance", path: "/line-clearance", icon: CheckCircle },
    { label: "SMP", path: "/smp", icon: FileText },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
        <button onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
        <h1 className="text-lg font-semibold">Kay QMS</h1>
        <div />
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-lg">Welcome 👋</p>
              <p className="text-sm opacity-80">User Name</p>
            </div>
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>
        </div>

        {/* Menu */}
        <div className="mt-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={index}
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center justify-between px-5 py-4 text-left transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </div>

                <ChevronRight
                  size={18}
                  className="opacity-50"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Page Content */}
      <div className="p-4">
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-gray-700">
            Your page content goes here...
          </p>
        </div>
      </div>
    </div>
  );
}