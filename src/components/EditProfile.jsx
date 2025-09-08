import { useState } from "react";
import Feed from "./Feed";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("");
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                photoUrl,
                firstName,
                lastName,
                age,
                gender,
                about
            }, {withCredentials:true});
            dispatch(addUser(res?.data?.data));
              alert("✅ Profile saved successfully!");

        } catch (err) {
            setError(err.message);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", {
            photoUrl,
            firstName,
            lastName,
            age,
            gender,
            about,
        });
    };

    return (
        <div className="flex justify-center items-center">
            <div className="flex justify-center items-start min-h-screen px-4 py-16 bg-base-200 basis-3/4">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-sm bg-base-300 text-white border border-gray-300/60 rounded-2xl shadow-lg p-6 space-y-4 mb-8"
                >
                    <h1 className="text-2xl font-semibold text-center mb-4">
                        Edit Profile
                    </h1>

                    {/* Profile Photo */}
                    <div className="flex flex-col items-center">
                        <img
                            src={photoUrl || "https://via.placeholder.com/100"}
                            alt="Profile Preview"
                            className="w-24 h-24 rounded-full object-cover border mb-3"
                        />
                        <label className="w-full text-sm font-medium text-gray-300">
                            Profile Photo URL
                            <input
                                type="url"
                                placeholder="Paste a photo URL"
                                className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 text-grey-500 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                        </label>
                    </div>

                    {/* First Name */}
                    <label className="block text-sm font-medium text-gray-300">
                        First Name
                        <input
                            type="text"
                            placeholder="Enter your first name"
                            className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>

                    {/* Last Name */}
                    <label className="block text-sm font-medium text-gray-300">
                        Last Name
                        <input
                            type="text"
                            placeholder="Enter your last name"
                            className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>

                    {/* Age */}
                    <label className="block text-sm font-medium text-gray-300">
                        Age
                        <input
                            type="number"
                            placeholder="Enter your age"
                            className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </label>

                    {/* Gender */}
                    <label className="block text-sm font-medium text-gray-300">
                        Gender
                        <input
                            type="text"
                            placeholder="Enter your gender"
                            className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </label>

                    {/* about */}
                    <label className="block text-sm font-medium text-gray-300">
                        about
                        <textarea
                            rows="3"
                            placeholder="Write a short about..."
                            className="w-full px-3 py-2 mt-1 rounded-lg border border-gray-300 text-white placeholder-gray-500 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                        ></textarea>
                    </label>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-full bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition" onClick={saveProfile}
                    >
                        Save Profile
                    </button>
                </form>
            </div>
            <Feed user={{ firstName, lastName, age, gender, photoUrl }} className="basis-1/3" />
        </div>
    );
};

export default EditProfile;
