import React, { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { getPost, likePost, getRelatedPosts } from '../../services/api';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import './DisplaySingleBlogPostPage.scss';

const DisplaySingleBlogPostPage = () => {
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [error, setError] = useState(null);
    const { id } = useParams();


    const renderContent = (content) => {
        if (typeof content === 'string') {
            return <ReactMarkdown>{content}</ReactMarkdown>;
        } else if (content && typeof content === 'object' && content.hasOwnProperty('content')) {
            return <ReactMarkdown>{content.content}</ReactMarkdown>;
        } else {
            console.error('Unexpected content format:', content);
            return <p>Unable to display content</p>;
        }
    };

    useEffect(() => {
        const fetchPostAndRelated = async () => {
            try {
                const postResponse = await getPost(id);
                console.log('Fetched post:', postResponse.data);
                setPost(postResponse.data);

                const relatedResponse = await getRelatedPosts(id);
                console.log('Fetched related posts:', relatedResponse.data);
                setRelatedPosts(Array.isArray(relatedResponse.data) ? relatedResponse.data : []);
            } catch (error) {
                console.error('Error fetching post or related posts:', error);
                setError('Failed to fetch post or related posts');
            }
        };

        fetchPostAndRelated();
    }, [id]);

    const handleLike = async () => {
        try {
            const response = await likePost(id);
            setPost(prevPost => ({
                ...prevPost,
                likes: response.data.likes
            }));
        } catch (error) {
            console.error('Error liking post:', error);
            setError('Failed to like post');
        }
    };


    const renderImage = useMemo(() => (imageData, className = 'single-blog-post-page__image') => {
        if (!imageData || !imageData.data || !imageData.contentType) {
            return null;
        }

        const blob = new Blob([new Uint8Array(imageData.data.data)], { type: imageData.contentType });
        const imageUrl = URL.createObjectURL(blob);

        return <img src={imageUrl} alt="Post" className={className} />;
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (!post) return <div>Loading...</div>;

    return (
        <div className="single-blog-post-page">
            <Header />
            <Nav />
            <div className="singleBlogPost__container">
                {post.image && renderImage(post.image)}
                <h1 className="single-blog-post-page__title">{post.title}</h1>
                <p className="single-blog-post-page__author">Author: {post.author}</p>
                <p className="single-blog-post-page__date">Date: {new Date(post.date).toLocaleDateString()}</p>
                <div className="single-blog-post-page__content">
                    {renderContent(post.content)}
                </div>
                <div className="single-blog-post__likes-section">
                    <button className="single-blog-post__like-button" onClick={handleLike}>
                        Like
                    </button>
                    <span className="single-blog-post__likes-count">
                        {post.likes} {post.likes === 1 ? 'like' : 'likes'}
                    </span>
                </div>

                {relatedPosts.length > 0 && (
                    <div className="related-posts">
                        <h2 className="related-posts__title">Related Posts</h2>
                        <div className="related-posts__container">
                            {relatedPosts.map(relatedPost => (
                                <div key={relatedPost._id} className="related-post">
                                    {relatedPost.image && renderImage(relatedPost.image, 'single-blog-post-page__image')}
                                    <h3 className="related-post__title">{relatedPost.title}</h3>
                                    <div className="related-post__excerpt">
                                        {renderContent(relatedPost.content ? relatedPost.content.substring(0, 100) + '...' : '')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default DisplaySingleBlogPostPage;
