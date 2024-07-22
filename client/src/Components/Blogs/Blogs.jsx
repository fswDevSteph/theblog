import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blogs = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    //! Function to convert array buffer to base64
    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    return (
        <div>
            {posts.map((post) => (
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    {post.imageUrl ? (
                        <img
                            src={`${import.meta.env.VITE_API_URL}/uploads/${post.imageUrl}`}
                            alt="Post Image"
                            className="post__image"
                        />
                    ) : post.image ? (
                        <img
                            src={`data:${post.image.contentType};base64,${arrayBufferToBase64(post.image.data.data)}`}
                            alt="Post Image"
                            className="post__image"
                        />
                    ) : null}
                    <p>Author: {post.author}</p>
                    <p>Date: {new Date(post.date).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default Blogs;
