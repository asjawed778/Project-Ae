import logo from "../../../public/logo.svg";
import { CiSearch } from "react-icons/ci";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { logout } from "../../store/reducers/authReducer";
import HamNavbar from "./HamNavbar";
import { useLogoutMutation } from "../../services/auth.api";
// import { logoutUser } from "../../services/operations/authApi";

export default function Header() {
  const { token } = useSelector((store) => store.auth);
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const [logoutUser, { isLoading, error }] = useLogoutMutation();


  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/auth");
    } catch (err) {
      toast.error("Error", error.message);
    }
  };
  // const handleLogout = async () => {
  //   dispatch(logoutUser(navigate));
  // };

  return (
    <nav className="flex w-full items-center justify-between gap-4 h-20 py-4 px-10 sm:px-20 md:px-10">
      {/* Logo */}
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className=" lg:w-[200px] md:w-[170px] min-w-[150px] h-[45px]"
        />
      </Link>

      {/* For Bigger Screen */}
      <div className="hidden  font-bold md:flex space-x-16">
        {/* Second Section */}
        <div className="relative">
          <CiSearch className="absolute left-2 top-3 size-6 text-[var(--color-primary)]" />
          <input
            type="text"
            placeholder="Type to search"
            className="font-normal text-lg pl-10 px-2 py-2 border rounded-md outline-none"
          />
        </div>

        {/* Third Section */}
        <div className="flex items-center gap-10">
          <Link to="/course" className="text-[var(--color-primary)]">
            Learning
          </Link>

          {/* <Link
              to=""
              className="text-[var(--color-primary)]"
            >
              Resource
            </Link> */}

          <Link to="/blog" className="text-[var(--color-primary)]">
            Blog
          </Link>

          {/* <Link
              to=""
              className="text-[var(--color-primary)]"
            >
              Contact Us
            </Link> */}

          {token ? (
            <button
              onClick={handleLogout}
              className="text-[var(--color-primary)]"
            >
              Logout
            </button>
          ) : (
            <Link to="/auth" className="text-[var(--color-primary)]">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* For Small Screen */}
      <div className="font-bold md:hidden ml-auto">
        <HamNavbar handleLogout={handleLogout} />
      </div>
    </nav>
  );
}
