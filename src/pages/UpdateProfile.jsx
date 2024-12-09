import React, { useState } from "react";
import { updateProfile } from "../service/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    briefDescription: "",
    detailedDescription: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate= useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await updateProfile(formData, token);
      toast.success(response.data);
    navigate('/')
    } catch (err) {
      toast.error(err.response?.data || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Update Your Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6 border border-gray-300"
      >
        <div>
          <label htmlFor="briefDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Brief Description
          </label>
          <textarea
            id="briefDescription"
            name="briefDescription"
            value={formData.briefDescription}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a brief description"
          ></textarea>
        </div>

        <div>
          <label htmlFor="detailedDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Detailed Description
          </label>
          <textarea
            id="detailedDescription"
            name="detailedDescription"
            value={formData.detailedDescription}
            onChange={handleChange}
            rows="6"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a detailed description"
          ></textarea>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your address"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
