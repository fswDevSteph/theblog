import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5050',
    timeout: 10000
});

console.log('API Base URL:', api.defaults.baseURL);

export const getPosts = async () => {
    return api.get('/api/posts');
};

export const getPost = async (id) => {
    return api.get(`/api/posts/${id}`);
};

export const createPost = async (postData) => {
    return api.post('/api/posts', postData);
};

export const getFeaturedPost = async () => {
    return api.get('/api/posts/featured');
};

export const updatePost = async (id, postData) => {
    return api.put(`/api/posts/${id}`, postData);
};

export const deletePost = async (id) => {
    return api.delete(`/api/posts/${id}`);
};

//! like a post
export const likePost = async (id) => {
    return api.post(`/api/posts/${id}/like`);
};

//!get related posts
export const getRelatedPosts = async (postId) => {
    return api.get(`/api/posts/related/${postId}`);
};