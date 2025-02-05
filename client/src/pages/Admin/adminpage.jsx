import { useState } from "react";
import AddCourse from "./AddCourse";
import HambergIcon from "../../../public/imgs/slider/menu.png";

const adminpage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const toggleDropdown = () => {
    setDrawer(!drawer);
  };

  return (
    <div className=" flex flex-row">
      {/* Left component Admin Sidebar */}
      <div className={`h-auto ${!isOpen ? "items-start" : ""}`}>
        {/* Sidebar */}
        <div
          className={`fixed z-50 inset-y-0 left-0 transform bg-gray-800 text-white w-64 max-h-full p-4 transition-transform duration-300 ease-in-out
             ${
               isOpen ? "translate-x-0" : "-translate-x-full"
             } lg:translate-x-0 lg:static lg:w-80 lg:h-screen`}
        >
          <p
            className="lg:hidden ml-[90%] text-2xl font-thin text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            X
          </p>

          <h2 className="text-2xl mb-6">Dashboard </h2>

          <div>
            {/* Dropdown Element */}
            <div
              onClick={toggleDropdown}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-800  hover:bg-gray-700 text-white rounded-md focus:outline-none"
            >
              {/* Text label */}
              <span className="text-[20px]">Courses</span>
              {/* Down arrow icon */}
              <svg
                className={`w-4 h-4 text-gray-400 transform transition-transform ${
                  drawer ? "rotate-180" : ""
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

            {/* Dropdown Menu */}
            {drawer && (
              <div className="left-0 mt-2 w-48  text-white rounded-md z-10">
                <a
                  href="#add-course"
                  className="block px-8 py-2 text-sm hover:bg-gray-700 rounded-t-md"
                >
                  Add Course
                </a>
                <a
                  href="#manage-courses"
                  className="block px-8 py-2 text-sm hover:bg-gray-700"
                >
                  Manage Courses
                </a>
                <a
                  href="#view-courses"
                  className="block px-8 py-2 text-sm hover:bg-gray-700 rounded-b-md"
                >
                  View Courses
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Toggle button for mobile */}
        <div className="flex flex-col w-full">
          {!isOpen && (
            <button
              className={`lg:hidden top-2 left-4 ml-3 z-20 ${
                isOpen ? "bg-gray-800 text-white" : "bg-white text-black"
              } p-2 rounded`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <img src={HambergIcon} alt="sorry" className="w-[25px] h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Right Component Admin */}
      <div className=" w-full overflow-y-auto h-screen">
        <AddCourse />
      </div>
    </div>
  );
};

export default adminpage;
