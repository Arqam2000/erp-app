import {
  Menu, X,
  Bell,
  CheckCircle,
  FileText,
  ChevronRight,
  LogOut,
  SquareArrowRightExit,
  LayoutDashboard,
  SquareUserRound  
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import useLoginName from '../context/LoginContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { LoginName, setLoginName, setLoginId } = useLoginName()

  const menuItems = [
    { label: "Dashboard",  
      icon: LayoutDashboard,
      children: [
        {label: "Production Status", path: "/production-status"},
        {label: "Intimation Not Responded", path: "/intimation-status"},
        {label: "Today's Line Clearance", path: "/line-clearance-today"},
      ]
    },
    { label: "Intimation", path: "/check-authorization", icon: Bell, mscode: "SENDI" },
    {
      label: "Line Clearance",
      // path: "/line-clearance",
      icon: CheckCircle,
      children: [
        { label: "Add Line Clearance", path: "/check-authorization", mscode: 'LC' },
        { label: "Edit/Delete Line Clearance", path: "/check-authorization", mscode: 'LC' },
      ],
    },
    // { label: "Edit/Delete Line Clearance", path: "/edit-line-clearance", icon: CheckCircle },
    {
      label: "SMP",
      // path: "/smp", 
      icon: FileText,
      children: [
        // { label: "Add SMP", path: "/add-smp", mscode: 'ACT' },
        { label: "Add SMP", path: "/check-authorization", mscode: 'SMP' },
        { label: "Close SMP", path: "/close-smp", mscode: 'SMP' },
        { label: "Check/Review SMP", path: "/check-smp", mscode: 'SMP' },
        { label: "Edit/Delete SMP", path: "/check-authorization", mscode: 'SMP' },
      ],
    },
    {
      label: "Product Registration Document",
      path: "/product-registration-document",
      icon: FileText
    },
    { label: "Logout", path: "/", icon: LogOut },
    { label: "Exit", path: "/", icon: SquareArrowRightExit },
  ];

  const handleNavigate = (label, path, mscode) => {
    if (label === "Logout" || label === "Exit") {
      localStorage.removeItem("loginId")
      localStorage.removeItem("loginName")
      setLoginName("")
      setLoginId(null)
    }
    navigate(path, {state: {label, mscode}});
    setOpen(false);
  };

  useEffect(() => {
    setLoginName(localStorage.getItem("loginName"))
  }, [])

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
        <button onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
        <h1 className="text-lg font-semibold">Kay QMS</h1>
        <div />
      </div>
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"
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
              <p className="font-semibold text-lg flex gap-1 items-center">Welcome <SquareUserRound /></p>
              <p className="text-sm opacity-80">{LoginName}</p>
            </div>
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>
        </div>

        {/* Menu */}
        <div className="mt-2">
          {/* {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={index}
                onClick={() => handleNavigate(item.label, item.path)}
                className={`w-full flex items-center justify-between px-5 py-4 text-left transition-all duration-200
                ${isActive
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
          })} */}

          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isSubMenuOpen = openSubMenu === index;

            // If item has children (submenu)
            if (item.children) {
              return (
                <div key={index}>
                  {/* Parent Menu */}
                  <button
                    onClick={() =>
                      setOpenSubMenu(isSubMenuOpen ? null : index)
                    }
                    className="w-full flex items-center justify-between px-5 py-4 text-left text-gray-700 hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </div>

                    <ChevronRight
                      size={18}
                      className={`transition-transform ${isSubMenuOpen ? "rotate-90" : ""
                        }`}
                    />
                  </button>

                  {/* Submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isSubMenuOpen ? "max-h-40" : "max-h-0"
                      }`}
                  >
                    {item.children.map((subItem, subIndex) => {
                      const isActive = location.pathname === subItem.path;

                      return (
                        <button
                          key={subIndex}
                          onClick={() =>
                            handleNavigate(subItem.label, subItem.path, subItem.mscode)
                          }
                          className={`w-full text-left pl-14 pr-5 py-3 text-sm transition-all
                ${isActive
                              ? "bg-indigo-50 text-indigo-600"
                              : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                          {subItem.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            }

            // Normal menu item
            const isActive = location.pathname === item.path;

            return (
              <button
                key={index}
                onClick={() => handleNavigate(item.label, item.path, item.mscode)}
                className={`w-full flex items-center justify-between px-5 py-4 text-left transition-all duration-200
      ${isActive
                    ? "bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600"
                    : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </div>

                <ChevronRight size={18} className="opacity-50" />
              </button>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default Navbar