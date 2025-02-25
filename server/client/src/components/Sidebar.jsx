import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../services/operations/authApi";
import { useNavigate } from "react-router-dom";

//by default image
import boy from "./boy1.png";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      dispatch(logoutUser());
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const data = {
    fullName: "John Doe",
    username: "johndoe",
    profileImg: "/avatars/boy1.png",
  };

  return (
    <div className="md:flex-[2_2_0]  h-full fixed  w-18 max-w-72  responsive-component mt-8">
      <div className="sticky top-0 left-0 h-screen flex flex-col w-20 md:w-full ">
        <ul className="flex flex-col gap-3 mt-4">
          <li className="flex justify-center md:justify-start">
            <Link
              to="/"
              className="flex gap-3 items-center hover:bg-sky-300 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <MdHomeFilled className="w-6 h-6" />
              <span className="text-lg hidden md:block">Home</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-start">
            <Link
              to="/notifications"
              className="flex gap-3 items-center hover:bg-sky-300 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <IoNotifications className="w-5 h-5" />
              <span className="text-lg hidden md:block">Notifications</span>
            </Link>
          </li>

          <li className="flex justify-center md:justify-start">
            <Link
              to={`/profile/${data?.username}`}
              className="flex gap-3 items-center hover:bg-sky-300 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
            >
              <FaUser className="w-5 h-5" />
              <span className="text-lg hidden md:block">Profile</span>
            </Link>
          </li>
        </ul>
        {user && (
          <Link
            to="/user"
            className="mt-auto mb-10 flex gap-2 items-center transition-all duration-300 hover:bg-sky-300 py-2 px-2 rounded-full"
          >
            <div className="avatar hidden md:inline-flex">
              <div className="w-6 rounded-full">
                <img src={boy} />
              </div>
            </div>
            <div className="flex justify-around flex-1">
              <div className="hidden md:block">
                <p className="text-black font-bold text-sm w-20 truncate">
                  {user?.name}
                </p>
                <p className="text-slate-500 text-sm">@{user?.username}</p>
              </div>
              <BiLogOut
                className="w-5 h-5 cursor-pointer "
                onClick={handleLogout}
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Sidebar;
