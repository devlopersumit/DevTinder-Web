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
            if (err.status === 401) {
                navigate('/login');
            }
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="w-full min-h-screen flex flex-col pt-16">
            <Navbar />
            <div className="flex-grow mt-10">
                <Outlet />
            </div>
            <Footer />
        </div>


    )
};

export default Body;