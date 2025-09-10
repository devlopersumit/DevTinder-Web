import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  console.log(connections);
  
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
      <h1 className="text-3xl font-bold mb-6 text-center">🔥 Your Connections</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {connections.map((user) => (
          <div
            key={user._id}
            className="card bg-base-300 w-80 shadow-lg rounded-xl overflow-hidden 
                       transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Image */}
            <figure className="px-4 pt-4">
              <img
                src={user.photoUrl}
                alt={user.firstName}
                className="rounded-xl h-64 w-full object-cover"
              />
            </figure>

            {/* Info */}
            <div className="card-body">
              <h2 className="card-title">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600">
                {user.age}, {user.gender}
              </p>
              <p className="text-sm text-gray-500">
                {user.about ? user.about : "No bio available"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
