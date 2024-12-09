import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { blogPost, deleteBlog } from "../service/api";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFEYFrj1QqAmQrrW3b0OJeODAR7JufySyrRg&s";

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await blogPost(token);
        setBlogPosts(response.data);
        setLoading(false);
        toast.success(response.data);
      } catch (err) {
        setLoading(false);
        toast.error(err.response?.data || "An error occurred while fetching blog posts.");
      }
    };

    fetchBlogPosts();
  }, [token]);

  const handleUpdate = (id) => {
    navigate(`/updateblg/${id}`);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await deleteBlog(token, id);
      if (response.data === 200) {
        toast.success(response.data);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error(response.data || "Failed to delete the blog.");
      }
    } catch (error) {
      toast.error(error.response?.data || "An error occurred while deleting the blog.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Blog Posts</h1>

      {loading && (
        <div className="text-center text-gray-500">Loading blog posts...</div>
      )}
      {!loading && blogPosts.length === 0 && (
        <div className="text-center text-gray-500">No blog posts available.</div>
      )}

      <div className="space-y-8">
        {blogPosts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-6 rounded-lg border border-gray-300 hover:border-blue-300"
          >
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">{post.title}</h2>
            <img
              src={url}
              alt="Blog Post"
              className="h-64 object-cover rounded-md mb-4 mx-auto"
            />
            <p className="text-gray-700 mb-4">{post.description}</p>
            <p className="text-gray-600">{post.content}</p>
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => handleUpdate(post._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Update Blog
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Delete Blog
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* <ToastContainer /> */}
    </div>
  );
};

export default Blog;
