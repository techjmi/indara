import React, { useState, useEffect } from "react";
import axios from "axios";
import { blogPost } from "../service/api";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate= useNavigate()

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await blogPost(token);
        setBlogPosts(response.data); 
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blog posts.");
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);
  const handleUpdate = (id) => {
    // Navigate to the update profile page
    console.log('Update clicked');
    navigate(`/updateblg/${id}`);
  };
  
  const handleDelete=()=>{

  }
  return (
    <div className="container mx-auto p-4">
  <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Blog Posts</h1>

  {loading && (
    <div className="text-center text-gray-500">Loading blog posts...</div>
  )}
  {error && (
    <div className="text-center text-red-500 mb-4">{error}</div>
  )}
  {!loading && blogPosts.length === 0 && (
    <div className="text-center text-gray-500">No blog posts available.</div>
  )}

  {/* Display each blog post one by one */}
  <div className="space-y-8">
    {blogPosts.map((post) => (
      <div
        key={post._id}
        className="bg-white p-6 rounded-lg border border-gray-300 hover:border-blue-300"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">{post.title}</h2>
        <img
          src={`/images/${post.image}`} 
          alt="Blog Post"
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <p className="text-gray-700 mb-4">{post.description}</p>
        <p className="text-gray-600">{post.content}</p> 
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={ ()=>handleUpdate(post._id) }
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Update Profile
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Delete Account
          </button>
        </div>
      </div>
      
    ))}
    
  </div>
</div>

  );
};

export default Blog;
