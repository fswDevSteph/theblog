// //!BlogList.jsx:
// //!This component fetches all blog posts from MongoDB via an API call.
// //!It renders a list of BlogPost components, passing the data for each post as props.

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import BlogPost from '../BlogPost/BlogPost';
// import './BlogList.scss';

// const BlogList = ({ isPreview = true, limit = null, excludeFeatured = false }) => {
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 console.log('Fetching posts...');
//                 // const response = await axios.get('http://localhost:5050/api/posts');
//                 const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
//                 console.log('Fetched posts:', response.data);
//                 let sortedPosts = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));

//                 if (excludeFeatured) {
//                     sortedPosts = sortedPosts.filter(post => !post.featured);
//                 }

//                 if (limit) {
//                     sortedPosts = sortedPosts.slice(0, limit);
//                 }
//                 console.log('Posts to display:', sortedPosts);
//                 setPosts(sortedPosts);
//             } catch (error) {
//                 console.error('Error fetching posts:', error);
//             }
//         };

//         fetchPosts();
//     }, [limit, excludeFeatured]);

//     return (
//         <div className="blog-list">
//             {posts.map(post => (
//                 <div key={post._id} className="blog-list__item">
//                     <BlogPost
//                         key={post._id}
//                         id={post._id}
//                         title={post.title}
//                         date={new Date(post.date).toLocaleDateString()}
//                         content={post.content}
//                         images={post.images}
//                         isPreview={isPreview}
//                     />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default BlogList;

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
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
                console.log('Fetched posts:', response.data);

                // Check if response.data is an array
                if (!Array.isArray(response.data)) {
                    console.error('Expected an array of posts, but got:', typeof response.data);
                    setError('Unexpected data format received from server');
                    return;
                }

                let sortedPosts = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));

                if (excludeFeatured) {
                    sortedPosts = sortedPosts.filter(post => !post.featured);
                }

                if (limit) {
                    sortedPosts = sortedPosts.slice(0, limit);
                }
                console.log('Posts to display:', sortedPosts);
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
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        date={new Date(post.date).toLocaleDateString()}
                        content={post.content}
                        images={post.images}
                        isPreview={isPreview}
                    />
                </div>
            ))}
        </div>
    );
};

export default BlogList;