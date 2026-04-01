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
import Navbar from "../components/Navbar";

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
      <Navbar />

      {/* Overlay */}
      

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