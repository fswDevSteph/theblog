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

    return (
        <div>
            {posts.map((post) => (
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    {post.imageUrl && (
                        <img
                            src={post.imageUrl}
                            alt="Post Image"
                            className="post__image"
                        />
                    )}
                    <p>Author: {post.author}</p>
                    <p>Date: {new Date(post.date).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default Blogs;