import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPost from '../BlogPost/BlogPost';
import './BlogList.scss';

const BlogList = ({ isPreview = true, limit = null, excludeFeatured = false }) => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log('Fetching posts...');
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`, { timeout: 10000 });
                console.log('Raw response:', response);

                if (!Array.isArray(response.data)) {
                    console.error('Response is not an array:', response.data);
                    setError('Unexpected response format');
                    return;
                }

                let postsData = response.data;

                if (postsData.length === 0) {
                    console.warn('No posts found');
                    setError('No posts available');
                    return;
                }

                let sortedPosts = postsData.sort((a, b) => new Date(b.date) - new Date(a.date));

                if (excludeFeatured) {
                    sortedPosts = sortedPosts.filter(post => !post.featured);
                }

                if (limit) {
                    sortedPosts = sortedPosts.slice(0, limit);
                }

                setPosts(sortedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to fetch posts');
            }
        };

        fetchPosts();
    }, [limit, excludeFeatured]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="blog-list">
            {posts.map(post => (
                <div key={post._id} className="blog-list__item">
                    <BlogPost
                        id={post._id}
                        title={post.title}
                        date={new Date(post.date).toLocaleDateString()}
                        content={post.content}
                        imageUrl={post.imageUrl}
                        isPreview={isPreview}
                    />
                </div>
            ))}
        </div>
    );
};

export default BlogList;
