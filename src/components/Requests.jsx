import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  // Fetch received requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      console.log("Requests API response:", res.data);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log("Error fetching requests:", err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Requests</h1>
        <p className="text-gray-500">No requests found 📭</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📩 Requests</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {requests.map((request) => {
          // Safe destructuring with optional chaining
          const user = request.fromUserId || {};
          const { firstName, lastName, age, gender, photoUrl, about, _id } = user;

          return (
            <div
              key={_id || request._id}
              className="card bg-base-300 w-80 shadow-lg rounded-xl overflow-hidden 
                         transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Image */}
              <figure className="px-4 pt-4 h-64 overflow-hidden">
                <img
                  src={photoUrl || "/default.png"}
                  alt={firstName || "User"}
                  className="w-full h-full object-cover rounded-xl"
                />
              </figure>

              {/* Info */}
              <div className="card-body">
                <h2 className="card-title text-lg">
                  {firstName || "Unknown"} {lastName || ""}
                </h2>
                <p className="text-gray-600">{age ? `${age}, ${gender}` : "Details not available"}</p>
                <p className="text-sm text-gray-500">{about || "No bio available"}</p>

                {/* Action buttons */}
                <div className="flex justify-between mt-4">
                  <button className="btn btn-success btn-sm w-1/2 mr-2">✅ Accept</button>
                  <button className="btn btn-error btn-sm w-1/2">❌ Reject</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
