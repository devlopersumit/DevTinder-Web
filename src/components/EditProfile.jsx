import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const defaultPhoto = "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png";

  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || defaultPhoto);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { photoUrl, firstName, lastName, age, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));

      toast.success("✅ Profile saved successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      setError(err.message);
      toast.error("❌ Error saving profile", { autoClose: 3000 });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center px-4 py-16">
      <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-8 w-full max-w-6xl">
        
        {/* Edit Profile Form */}
        <form
          className="w-full max-w-md bg-base-300 text-white border border-gray-300/60 rounded-2xl shadow-lg p-6 space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-2xl font-semibold text-center mb-4">Edit Profile</h1>

          {/* Profile Photo */}
          <div className="flex flex-col items-center">
            <img
              src={photoUrl || defaultPhoto}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover border mb-3"
            />
            <label className="w-full text-sm font-medium text-gray-300">
              Profile Photo URL
              <input
                type="url"
                placeholder="Paste a photo URL"
                className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>
          </div>

          {/* Other Fields */}
          <div className="grid grid-cols-1 gap-3">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Age"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            
            {/* Gender Dropdown */}
            <select
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-white bg-base-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <textarea
              rows="3"
              placeholder="About"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-full bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition"
            onClick={saveProfile}
          >
            Save Profile
          </button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>

        {/* Logged-in User Card (Tinder Style, No Buttons) */}
        <div className="w-full max-w-sm flex justify-center">
          <div className="relative w-72 sm:w-80 h-[480px] card bg-base-300 text-white rounded-2xl shadow-lg overflow-hidden">
            <figure className="h-[60%] overflow-hidden">
              <img
                src={photoUrl || defaultPhoto}
                alt={firstName}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="h-[40%] p-4 flex flex-col justify-center">
              <div>
                <h2 className="text-xl font-bold">{firstName} {lastName}</h2>
                <p className="text-gray-300 text-sm">{age ? `${age}, ${gender}` : "Details not available"}</p>
                <p className="text-gray-400 text-sm line-clamp-2">{about || "No bio available"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default EditProfile;
