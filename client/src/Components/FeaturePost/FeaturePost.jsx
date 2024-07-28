import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './FeaturePost.scss';

const FeaturePost = () => {
    const [featuredPost, setFeaturedPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // axios.get('http://localhost:5050/api/posts/featured')
        axios.get(`${import.meta.env.VITE_API_URL}/api/posts/featured`)
            .then(response => {
                console.log('Featured post data:', response.data);
                setFeaturedPost(response.data);
            })
            .catch(error => {
                console.error('Error fetching featured post:', error);
                setError('Failed to load featured post');
            });
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (!featuredPost) return <div>Loading featured post...</div>;

    return (
        <div className="featured-post feature-post">
            <h2 className="featured-post__label">Featured Post</h2>
            {featuredPost.imageUrl && (
                <div className="featured-post__image-wrapper">
                    <img src={featuredPost.imageUrl} alt={featuredPost.title} className="featured-post__image" />
                </div>
            )}
            <div className="featured-post__content">
                {featuredPost.date && (
                    <p className="featured-post__date">{new Date(featuredPost.date).toLocaleDateString()}</p>
                )}
                {featuredPost.title && (
                    <h2 className="featured-post__title">{featuredPost.title}</h2>
                )}
                {featuredPost.author && (
                    <p className="featured-post__author">By {featuredPost.author}</p>
                )}
                {featuredPost.category && (
                    <p className="featured-post__category">Category: {featuredPost.category}</p>
                )}
                {featuredPost.content && (
                    <p className="featured-post__text">{featuredPost.content.substring(0, 200)}...</p>
                )}
                {featuredPost.likes !== undefined && (
                    <p className="featured-post__likes">Likes: {featuredPost.likes}</p>
                )}
                <Link to={`/post/${featuredPost._id}`} className="featured-post__read-more">Continue Reading...</Link>
            </div>
        </div>
    );
};

export default FeaturePost;