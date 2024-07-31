import express from 'express';
import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import Post from '../models/Post.js';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

//! Get all posts
router.get('/', async (req, res) => {
    try {
        console.log('Fetching all posts...');
        const posts = await Post.find();
        console.log('Posts found:', posts.length);
        const postsData = posts.map(post => ({
            _id: post._id,
            title: post.title,
            content: post.content.substring(0, 200) + '...',
            author: post.author,
            date: post.date,
            imageUrl: post.imageUrl,
            category: post.category,
            likes: post.likes
        }));
        console.log('Sending posts data:', JSON.stringify(postsData, null, 2));
        res.json(postsData);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


//!get featured post
router.get('/featured', async (req, res) => {
    try {
        console.log('Fetching featured post...');
        const featuredPost = await Post.findOne({ featured: true });
        if (!featuredPost) {
            console.log('No featured post found');
            return res.status(404).json({ message: 'No featured post found' });
        }
        console.log('Featured post found:', JSON.stringify(featuredPost, null, 2));
        res.json(featuredPost);
    } catch (err) {
        console.error('Error fetching featured post:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

//!fetch related posts by category value
router.get('/:id', async (req, res) => {
    console.log('GET request received for post ID:', req.params.id);
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            console.log('Post not found');
            return res.status(404).json({ message: 'Post not found' });
        }

        const postWithImageUrl = {
            ...post._doc,
            imageUrl: post.imageUrl
        };
        console.log('Post found:', postWithImageUrl);
        res.json(postWithImageUrl);
    } catch (err) {
        console.error('Error fetching post:', err);
        res.status(500).json({ message: err.message });
    }
});

//! Get single post by ID
router.get('/:id', async (req, res) => {
    console.log('GET request received for post ID:', req.params.id);
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            console.log('Post not found');
            return res.status(404).json({ message: 'Post not found' });
        }

        const postWithImageUrl = {
            ...post._doc,
            imageUrl: post.imageUrl
        };
        console.log('Post found:', postWithImage);
        res.json(postWithImage);
    } catch (err) {
        console.error('Error fetching post:', err);
        res.status(500).json({ message: err.message });
    }
});

// //! Create new post with image
router.post('/', upload.array('imageUrl', 5), async (req, res) => {
    console.log('POST request received to create a new post');
    try {
        const imageUrl = req.files ? req.files.map(file => ({
            data: fs.readFileSync(path.join(__dirname, '../uploads/' + file.filename)),
            contentType: file.mimetype,
            caption: req.body[`caption_${file.fieldname}`]
        })) : [];

        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            date: Date.now(),
            category: req.body.category,
            imageUrl: imageUrl
        });

        const newPost = await post.save();
        console.log('New post created:', newPost);

        // Clean up uploaded files
        if (req.files) {
            req.files.forEach(file => {
                fs.unlinkSync(file.path);
            });
        }

        res.status(201).json(newPost);
    } catch (err) {
        console.error('Error creating new post:', err);
        res.status(400).json({ message: err.message });
    }
});

//! Like a post
router.post('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.likes = (post.likes || 0) + 1;
        await post.save();
        res.json({ likes: post.likes });
    } catch (error) {
        res.status(500).json({ message: 'Error liking post', error: error.message });
    }
});

//! Delete post by ID
router.delete('/:id', async (req, res) => {
    console.log('DELETE request received for post ID:', req.params.id);
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            console.log('Post not found');
            return res.status(404).json({ message: 'Post not found' });
        }
        console.log('Post deleted:', post);
        res.json({ message: 'Post deleted' });
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).json({ message: err.message });
    }
});

export default router;
