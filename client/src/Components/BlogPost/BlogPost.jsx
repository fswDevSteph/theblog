// import React from 'react';
// import { Link } from 'react-router-dom';
// import './BlogPost.scss';
// import ReactMarkdown from 'react-markdown';


// const BlogPost = ({ id, title, date, content, imageData, isPreview = true }) => {
//     const previewContent = content.split(' ').slice(0, 30).join(' ') + '...';

//     return (
//         <div className="blog-post">
//             <h2 className="blog-post__title">{title}</h2>
//             {imageData && <img src={imageData} alt={title} className="blog-post__image" />}
//             <p className="blog-post__date">{date}</p>
//             <div className="blog-post__content">
//                 {isPreview ? (
//                     <ReactMarkdown>{previewContent}</ReactMarkdown>
//                 ) : (
//                     <ReactMarkdown>{content}</ReactMarkdown>
//                 )}
//             </div>
//             {isPreview && <Link to={`/post/${id}`}>Continue Reading...</Link>}
//         </div>
//     );
// };

// export default BlogPost;

import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPost.scss';
import ReactMarkdown from 'react-markdown';

const BlogPost = ({ id, title, date, content, images, isPreview = true }) => {
    const renderContent = () => {
        if (!content) return null;

        const parts = content.split(/\[image:\d+\]/);
        const imageTagRegex = /\[image:(\d+)\]/g;
        let match;
        let index = 0;
        const elements = [];

        while ((match = imageTagRegex.exec(content)) !== null) {
            elements.push(<ReactMarkdown key={`text-${index}`}>{parts[index]}</ReactMarkdown>);
            const imageIndex = parseInt(match[1]) - 1;
            if (images && images[imageIndex]) {
                elements.push(
                    <figure key={`image-${index}`} className="blog-post__figure">
                        <img
                            src={`data:${images[imageIndex].contentType};base64,${images[imageIndex].data}`}
                            alt={images[imageIndex].caption || `Image ${imageIndex + 1}`}
                            className="blog-post__image"
                        />
                        {images[imageIndex].caption && <figcaption className="blog-post__caption">{images[imageIndex].caption}</figcaption>}
                    </figure>
                );
            }
            index++;
        }

        elements.push(<ReactMarkdown key={`text-${index}`}>{parts[index]}</ReactMarkdown>);
        return elements;
    };

    const previewContent = () => {
        const fullContent = renderContent();
        return fullContent.slice(0, 2); // Show first paragraph and potentially first image
    };

    return (
        <div className="blog-post">
            <h2 className="blog-post__title">{title}</h2>
            <p className="blog-post__date">{date}</p>
            <div className="blog-post__content">
                {isPreview ? previewContent() : renderContent()}
            </div>
            {isPreview && <Link to={`/post/${id}`} className="blog-post__read-more">Continue Reading...</Link>}
        </div>
    );
};

export default BlogPost;