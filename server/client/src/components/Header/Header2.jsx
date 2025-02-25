import logo from "../../../public/logo.svg";
import bar from "../../../public/imgs/slider/Hamburger_icon.png";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/authReducer";

export default function Header() {
  const { token } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  // useState
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    dispatch(logout());
  };
  return (
    // Header
    <nav className="bg-white flex flex-wrap items-center gap-20 p-4 justify-around w-full border-gray-200">
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      <div className="">
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
        className={`items-center justify-between ${
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

        <Link
          to="/course"
          className="text-[var(--color-primary)] font-sans mt-4  md:mt-0  md:ml-10"
        >
          Learning
        </Link>

        {/* <Link
            to=""
            className="text-[var(--color-primary)] font-sans mt-4  md:mt-0  md:ml-10"
          >
            Resource
          </Link> */}

        <Link
          to="/blog"
          className="text-[var(--color-primary)] font-sans mt-4  md:mt-0  md:ml-10"
        >
          Blog
        </Link>

        {/* <Link
            to=""
            className="text-[var(--color-primary)] font-sans mt-4  md:mt-0  md:ml-10"
          >
            Contact Us
          </Link> */}

        {token ? (
          <button
            onClick={handleLogout}
            className="text-[var(--color-primary)] font-sans mt-4 md:mt-0 md:ml-10 cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/auth"
            className="text-[var(--color-primary)] font-sans mt-4 md:mt-0 md:ml-10"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
