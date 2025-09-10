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
            const res = await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
            dispatch(removeUser());
            return navigate('/login');
        } catch (err) {
          console.log(err);
          
        }
    }

    return (
        <div className="navbar bg-base-300 shadow-sm fixed top-0">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost text-xl">🧑‍💻DevTinder</Link>
            </div>
            <div className="flex gap-2">
                <div className="form-control px-4">Welcome {user?.firstName}</div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        {user && <div className="w-10 rounded-full">
                            <img
                                alt={user.firstName}
                                src={user.photoUrl} />
                        </div>}
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-32 p-2 shadow text-xl">
                        <li>
                            <Link to='/profile' className="justify-between">
                                Profile
                            </Link>
                        </li>
                        <li><Link to='/connections'>Connections</Link></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;