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
                console.log('Response data:', response.data);
                console.log('Response data type:', typeof response.data);

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

                console.log('Fetched posts:', postsData);
                let sortedPosts = postsData.sort((a, b) => new Date(b.date) - new Date(a.date));
                console.log('Sorted posts:', sortedPosts);

                if (excludeFeatured) {
                    sortedPosts = sortedPosts.filter(post => !post.featured);
                    console.log('Filtered posts (excluding featured):', sortedPosts);
                }

                if (limit) {
                    sortedPosts = sortedPosts.slice(0, limit);
                    console.log('Limited posts:', sortedPosts);
                }

                setPosts(sortedPosts);
                console.log('Posts set to state:', sortedPosts);
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
                        key={post._id}
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