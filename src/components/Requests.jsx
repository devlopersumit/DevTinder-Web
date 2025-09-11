import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const reduxRequests = useSelector((store) => store.requests);

  const [requests, setRequests] = useState([]);

  // Fetch received requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
      setRequests(res.data.data);
    } catch (err) {
      console.log("Error fetching requests:", err.message);
    }
  };

  // Review request (accept/reject)
  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      setRequests((prev) => prev.filter((req) => req._id !== _id));
    } catch (err) {
      console.log("Error reviewing request:", err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-semibold mb-2">Requests</h1>
        <p className="text-gray-500 text-sm">No requests found 📭</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">📩 Requests</h1>

      <div className="flex flex-wrap justify-center gap-4 w-full max-w-5xl">
        {requests.map((request) => {
          const user = request.fromUserId || {};
          const { firstName, lastName, age, gender, photoUrl, about, _id } = user;

          return (
            <div
              key={_id || request._id}
              className="card bg-base-200 w-64 shadow-md rounded-xl overflow-hidden 
                         transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Image */}
              <figure className="h-40 overflow-hidden">
                <img
                  src={photoUrl || "/default.png"}
                  alt={firstName || "User"}
                  className="w-full h-full object-cover"
                />
              </figure>

              {/* Info */}
              <div className="card-body p-4">
                <h2 className="card-title text-base">
                  {firstName || "Unknown"} {lastName || ""}
                </h2>
                <p className="text-gray-600 text-sm">
                  {age ? `${age}, ${gender}` : "Details not available"}
                </p>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {about || "No bio available"}
                </p>

                {/* Action buttons */}
                <div className="flex justify-between mt-3">
                  <button
                    className="btn btn-success btn-xs w-1/2 mr-1"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    ✅ Accept
                  </button>
                  <button
                    className="btn btn-error btn-xs w-1/2 ml-1"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    ❌ Reject
                  </button>
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
