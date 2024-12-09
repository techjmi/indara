import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UpdateBlogPost } from "../service/api";
import { toast, ToastContainer } from "react-toastify";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", blog.title);
    formData.append("description", blog.description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await UpdateBlogPost(formData, token);
      if (response.status === 200) {
        toast.success(response.data);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data || "Failed to update the blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={blog.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="5"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Image</label>
          {imagePreview && (
            <div className="mb-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover"
              />
            </div>
          )}
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default UpdateBlog;
