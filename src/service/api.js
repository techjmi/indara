import axios from "axios";

const url = 'https://blogapitaskindrajala.onrender.com';

// Post signup API - Registers a new user
export const PostData = async (data) => {
    try {
        const response = await axios.post(`${url}/register`, data);
        console.log('signup', response);
        return response;
    } catch (error) {
        console.error("Error while posting signup data:", error.message);
        throw error;
    }
};

// Post signin API - Authenticates the user
export const PostSign = async (data) => {
    try {
        const response = await axios.post(`${url}/login`, data);
        console.log('login res', response);
        return response;
    } catch (error) {
        console.error("Error while posting signin data:", error.message);
        throw error;
    }
};

// Get user profile API - Retrieves the user profile data
export const getProfile = async (token) => {
    try {
        const response = await axios.get(`${url}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log('profile', response);
        return response;
    } catch (error) {
        console.error("Error while getting profile data:", error.message);
        throw error;
    }
};

// Update user profile API - Updates the user profile with new data
export const updateProfile = async (data, token) => {
    try {
        const response = await axios.put(`${url}/profile`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log('the res of update is', response);
        return response;
    } catch (error) {
        console.error("Error while updating the profile data:", error.message);
        throw error;
    }
};

// Delete user profile API - Deletes the user profile from the system
export const deleteProfile = async (token) => {
    // console.log('the delete token', token)
    try {
        const response = await axios.delete(`${url}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response;
    } catch (error) {
        console.error("Error while deleting the profile:", error.message);
        throw error;
    }
};

// Get all blog posts API - Fetches a list of blog posts
export const blogPost = async (token) => {
    try {
        const response = await axios.get(`${url}/blog`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log('blog post is', response);
        return response;
    } catch (error) {
        console.error("Error while getting blog posts:", error.message);
        throw error;
    }
};

// Create a new blog post API - Submits a new blog post
export const CreateBlogPost = async (data, token) => {
    try {
        const response = await axios.post(`${url}/blog`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log('blog post is', response);
        return response;
    } catch (error) {
        console.error("Error while creating the blog:", error.message);
        throw error;
    }
};

// Update a blog post API - Updates an existing blog post
export const UpdateBlogPost = async (data, token) => {
    try {
        const response = await axios.put(`${url}/blog`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log('blog post is', response);
        return response;
    } catch (error) {
        console.error("Error while updating the blog:", error.message);
        throw error;
    }
};

// Delete a blog post API - Deletes a specific blog post
export const deleteBlog = async (token, id) => {
    // console.log('delete id', token)
    try {
        const response = await axios.delete(`${url}/blog`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { id },
        });
        return response;
    } catch (error) {
        console.error("Error while deleting the blog:", error.message);
        throw error;
    }
};
