import React, { useState } from "react";
import { CreateBlogPost } from "../service/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    } else {
      setError("Please upload a valid image (JPEG/PNG).");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      const response = await CreateBlogPost(form, token);

      if (response.status === 201) {
        toast.success(response.data);
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data || "Failed to create blog post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Create Blog Post</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg max-w-full lg:max-w-3xl mx-auto">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter the title"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/jpeg, image/png"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter the description"
            rows="4"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Create Post"}
          </button>
        </div>
      </form>

      {/* <ToastContainer /> */}
    </div>
  );
};

export default CreateBlog;
