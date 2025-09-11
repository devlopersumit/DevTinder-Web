import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar fixed at top */}
      <Navbar />

      {/* Outlet Container */}
      <div className="flex-grow flex justify-center items-center px-4 py-6">
        <div className="w-full max-w-6xl">
          <Outlet />
        </div>
      </div>

      {/* Footer fixed at bottom */}
      <Footer />
    </div>
  );
};

export default Body;
