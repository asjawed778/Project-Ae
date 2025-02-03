import bar from "../../../public/imgs/slider/Hamburger_icon.png";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Header() {
  // useState
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // Header
    <nav className="bg-white border-gray-200 w-full">
      <div
        className={`max-w-screen-xl flex flex-wrap items-center gap-20 mx-auto p-4 justify-around md:ml-[10%] sm:justify-normal`}
      >
        <span className="text-2xl md:text-3xl font-sans text-black-600">
          Abilita<span className="text-blue-600 font-sans">Edge</span>
        </span>

        <div className=" md:order-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden text-gray-500 rounded-lg text-sm p-2.5 me-1 "
            aria-controls="navbar-search"
            aria-expanded={isMenuOpen}
          >
            <img src={bar} alt="bar" className="w-[30px] h-[30px]" />
            <span className="sr-only">Search</span>
          </button>
        </div>

        <div
          className={` items-center justify-between ${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1 `}
          id="navbar-search"
        >
          <div className=" relative w-auto md:w-1/3 mt-[-60px] md:mt-0 rounded-[14px] lg:w-[300px]">
            <span className="absolute inset-y-0 left-3 flex items-center">
              <MagnifyingGlassIcon className="h-5 w-5 text-[#0b66c3]" />
            </span>

            <input
              type="text"
              placeholder="Type to search"
              className="w-auto pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-[#f1f2f5] text-[#707070] font-sans"
            />
          </div>

          <button className="text-blue-600 font-sans mt-4  md:mt-0  md:ml-10">
            Learning
          </button>
        </div>
      </div>
    </nav>
  );
}
