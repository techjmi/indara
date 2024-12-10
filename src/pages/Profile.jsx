import React, { useEffect, useState } from "react";
import { deleteProfile, getProfile } from "../service/api";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvts5aHBstDkR8PigS4RmZkbZy78zpZoSuOw&s";

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }
      try {
        const response = await getProfile(token);
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch profile. Please try again.");
        toast.error("Failed to fetch profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // const handleUpdate = () => {
  //   // Navigate to the update profile page
  //   navigate("/update");
  // };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No token found, user not authenticated.");
      console.log("No token found, user not authenticated.");
      return;
    }

    try {
      const response = await deleteProfile(token);

      if (response.status === 200) {
        toast.success("User profile deleted successfully.");
        localStorage.removeItem("token");
        // window.location.href = "/login";
        navigate('/signup')
      } else {
        toast.error(`Error deleting user: ${response.statusText}`);
        console.error(`Error deleting user: ${response.statusText}`);
      }
    } catch (error) {
      toast.error("Failed to delete profile: " + (error.response ? error.response.data : error.message));
      console.error("Failed to delete profile:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-6">
        <div className="flex flex-col items-center space-y-4">
          <img
            src={user.photo || url} // Fallback image
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
          />
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phoneNumber}</p>
        </div>
        <div className="mt-6 space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">Account Details</h2>
          <p className="text-gray-700">
            <span className="font-medium">Brief Description:</span> {user.briefDescription}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Detailed Description:</span> {user.detailedDescription}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Address:</span> {user.address}
          </p>
        </div>
        <div className="mt-6 flex justify-between items-center">
        <Link
  to="/update-profile"
  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition inline-block text-center"
>
  Update Profile
</Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Delete Account
          </button>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Profile;
