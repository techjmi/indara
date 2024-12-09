import axios from "axios"


const url='https://blogapitaskindrajala.onrender.com'

//post signup api
export const PostData= async(data)=>{
    try {
        const response= await axios.post(`${url}/register`, data)
        console.log('signup', response)
        return response
    } catch (error) {
        console.error("Error while posting signup data:", error.message);
        throw error
    }
}
export const PostSign= async(data)=>{
    try {
        const response= await axios.post(`${url}/login`,data)
        console.log('login res', response)
        return response
    } catch (error) {
        console.error("Error while posting signin data:", error.message);
        throw error
    }
}

export const getProfile= async(token)=>{
    // console.log('token in api', token)
    try {
        const response= await axios.get(`${url}/profile`,{
            headers:{
                // Authorization:`Bearer${token}`
                Authorization: `Bearer ${token}`,
            }
        })
        console.log('profile', response)
        return response
    } catch (error) {
        console.error("Error while getting profile data:", error.message);
        throw error
    }
}

export const updateProfile=async(data, token)=>{
    console.log(data, token)
    try {
        const response= await axios.put(`${url}/profile`, data ,{
            headers:{
                // Authorization:`Bearer${token}`
                Authorization: `Bearer ${token}`,
            }
        })
        console.log('the res of update is', response)
        return response
    } catch (error) {
        console.error("Error while getting profile data:", error.message);
        throw error
    }
}
export const deleteProfile= async(token)=>{
    try {
        const response= await axios.delete(`${url}/delete`,{
            headers:{
                Authorization:`Bearer ${token}`,
            }
        })
    } catch (error) {
        console.error("Error while getting profile data:", error.message);
        throw error
    }
}

export const blogPost=async(token)=>{
    try {
        const response= await axios.get(`${url}/blog`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log('blog post is', response)
        return response
    } catch (error) {
        console.error("Error while getting profile data:", error.message);
        throw error
    }
}
export const CreateBlogPost=async(data,token)=>{
    console.log('blog post is', data, token)
    try {
        const response= await axios.post(`${url}/blog`,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log('blog post is', response)
        return response
    } catch (error) {
        console.error("Error while getting profile data:", error.message);
        throw error
    }
}

export const UpdateBlogPost=async(data,token)=>{
    console.log('blog post is', data, token)
    try {
        const response= await axios.put(`${url}/blog`,data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        console.log('blog post is', response)
        return response
    } catch (error) {
        console.error("Error while getting profile data:", error.message);
        throw error
    }
}