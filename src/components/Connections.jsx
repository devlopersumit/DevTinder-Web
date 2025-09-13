import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Connections</h1>
        <p className="text-gray-500">No connections found 🫂</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🔥 Your Connections
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {connections.map((user) => (
          <div
            key={user._id}
            className="relative w-72 h-96 bg-base-300 rounded-2xl shadow-xl overflow-hidden 
                       transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Image fills most of the card */}
            <img
              src={user.photoUrl}
              alt={user.firstName}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay info like Tinder */}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <h2 className="text-lg font-bold">
                {user.firstName} {user.lastName},{" "}
                <span className="font-normal">{user.age}</span>
              </h2>
              <p className="text-sm">{user.gender}</p>
              <p className="text-xs text-gray-200 mt-1 line-clamp-2">
                {user.about ? user.about : "No bio available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default connections;
