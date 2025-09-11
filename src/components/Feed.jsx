import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import { useEffect } from "react";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId)); // remove from Redux + UI
    } catch (err) {
      console.log(err.message);
    }
  };

  const getFeed = async () => {
    try {
      if (feed && feed.length > 0) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg font-medium">
        🎉 No more users in feed
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      {/* Tinder Card Stack */}
      <div className="relative w-72 sm:w-80 md:w-[400px] h-[500px]">
        {feed.map((u, index) => (
          <div
            key={u._id}
            className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl overflow-hidden transition-all duration-500"
            style={{
              zIndex: feed.length - index,
              transform: `translateY(${index * 8}px) scale(${1 - index * 0.03})`,
              opacity: index > 2 ? 0 : 1, // show only top 3
            }}
          >
            {/* Card Image with overlay */}
            <div className="relative w-full h-full">
              <img
                src={u.photoUrl || "/default.png"}
                alt={u.firstName}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay for text readability */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-white text-xl font-bold">
                  {u.firstName} {u.lastName}
                </h2>
                <p className="text-gray-200 text-sm">
                  {u.age ? `${u.age}, ${u.gender}` : "Details not available"}
                </p>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {u.about || "No bio available"}
                </p>
              </div>
            </div>

            {/* Buttons (floating at bottom) */}
            <div className="absolute bottom-4 left-0 w-full flex justify-center gap-6">
              <button
                className="btn btn-error btn-circle w-14 h-14 text-2xl shadow-lg hover:scale-110 transition"
                onClick={() => handleSendRequest("ignored", u._id)}
              >
                ❌
              </button>
              <button
                className="btn btn-success btn-circle w-14 h-14 text-2xl shadow-lg hover:scale-110 transition"
                onClick={() => handleSendRequest("interested", u._id)}
              >
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
