import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPost.scss';
import ReactMarkdown from 'react-markdown';

const BlogPost = ({ id, title, date, content, imageUrl, isPreview }) => {
    return (
        <div className="blog-post">
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={title}
                    onError={(e) => {
                        console.error('Error loading image:', imageUrl);
                        e.target.style.display = 'none';
                    }}
                />
            )}
            <h2>{title}</h2>
            <p>{date}</p>
            <p>{isPreview ? `${content.substring(0, 100)}...` : content}</p>
            {isPreview && <Link to={`/post/${id}`}>Read More</Link>}
        </div>
    );
};


export default BlogPost;
