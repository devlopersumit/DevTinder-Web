import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-md fixed top-0 left-0 right-0 z-50 px-6 py-2">
      {/* Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="text-2xl font-extrabold text-pink-600 hover:text-pink-700 transition"
        >
          🧑‍💻 DevTinder
        </Link>
      </div>

      {/* Right side */}
      {user && (
        <div className="flex items-center gap-4">
          {/* Greeting */}
          <span className="hidden sm:block text-lg font-medium">
            Hi, {user.firstName}
          </span>

          {/* Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-500">
                <img
                  alt={user.firstName}
                  src={user.photoUrl}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-xl shadow-lg mt-3 w-48 z-[9999] text-base font-medium"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-500">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
