//!Blog page that displays all blog posts

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import Nav from '../../Components/Nav/Nav';
import BlogList from '../../Components/BlogList/BlogList';


const Blog = () => {
    return (
        <div>
            <Header />
            <Nav />
            <h1>All Blog Posts</h1>
            <BlogList isPreview={false} />
        </div>
    );
}

export default Blog;
