import { Link } from "react-router-dom";
import HambergIcon from "../../../public/imgs/slider/menu.png";
import { useState } from "react";

const sections = [
  {
    name: "courses",
    links: [
      { url: "/admin", label: "Add Course" },
      { url: "/admin", label: "Manage Courses" },
      { url: "/admin", label: "View Courses" },
    ],
  },
  {
    name: "category",
    links: [
      { url: "/admin/add-category", label: "Add Category" },
      { url: "/admin/manage-categories", label: "Manage Categories" },
      { url: "/admin/view-categories", label: "View Categories" },
    ],
  },
];

export default function Sidebar({ isOpen = false, setIsOpen }) {
  const [drawer, setDrawer] = useState({});

  const toggleDropdown = (section) => {
    setDrawer((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (!isOpen) {
    return (
      <button
        className={`lg:hidden fixed top-2 left-4 ml-3 z-20 p-2 rounded ${
          isOpen ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
        onClick={() => setIsOpen && setIsOpen(!isOpen)}
      >
        <img src={HambergIcon} alt="Menu" className="w-[25px] h-4" />
      </button>
    );
  }

  return (
    <div
      className={`fixed z-50 inset-y-0 left-0 bg-gray-800 text-white w-64 max-h-full p-4 transition-transform duration-300 ease-in-out 
      ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:w-80 lg:h-screen`}
    >
      <p
        className="lg:hidden ml-auto text-2xl font-thin text-white cursor-pointer"
        onClick={() => setIsOpen && setIsOpen(!isOpen)}
      >
        X
      </p>

      <h2 className="text-2xl mb-6">Dashboard</h2>

      {sections.map(({ name, links }, index) => (
        <div key={index}>
          <div
            onClick={() => toggleDropdown(name)}
            className="flex items-center justify-between px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md cursor-pointer"
          >
            <span className="text-[20px] capitalize">{name}</span>
            <svg
              className={`w-4 h-4 text-gray-400 transform transition-transform ${
                drawer[name] ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {drawer[name] && (
            <div className="mt-2 w-48 text-white rounded-md">
              {links.map(({ url, label }, index) => (
                <Link
                  key={index}
                  to={url}
                  className={`block px-8 py-2 text-sm hover:bg-gray-700 ${
                    index === 0
                      ? "rounded-t-md"
                      : index === links.length - 1
                      ? "rounded-b-md"
                      : ""
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
