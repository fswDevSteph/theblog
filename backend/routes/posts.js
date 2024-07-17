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
        console.log('GET request received for all posts');
        const posts = await Post.find().sort({ date: -1 });
        console.log(`Found ${posts.length} posts`);

        const postsWithImages = posts.map(post => {
            let imageData = null;
            if (post.image && post.image.data) {
                imageData = `data:${post.image.contentType};base64,${post.image.data.toString('base64')}`;
                console.log('Image Data for post:', post._id, imageData);
            }
            return {
                ...post._doc,
                imageData
            };
        });

        res.json(postsWithImages);
    } catch (err) {
        console.error('Error in GET all posts:', err);
        res.status(500).json({ message: err.message });
    }
});

//!get featured post
router.get('/featured', async (req, res) => {
    try {
        const featuredPost = await Post.findOne({ featured: true });
        console.log('Featured post found');
        if (!featuredPost) {
            console.log('No featured post found');
            return res.status(404).json({ message: 'No featured post found' });
        }

        let imageData = null;
        if (featuredPost.image && featuredPost.image.data) {
            imageData = `data:${featuredPost.image.contentType};base64,${featuredPost.image.data.toString('base64')}`;
        }

        const featuredPostWithImage = {
            _id: featuredPost._id,
            title: featuredPost.title,
            content: featuredPost.content,
            date: featuredPost.date,
            author: featuredPost.author,
            imageData: imageData
        };

        console.log('Sending featured post:', JSON.stringify(featuredPostWithImage, null, 2));
        res.json(featuredPostWithImage);
    } catch (err) {
        console.error('Error fetching featured post:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

//!fetch related posts by category value
router.get('/related/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const relatedPosts = await Post.find({
            category: post.category,
            _id: { $ne: post._id }
        }).limit(3);

        const relatedPostsWithImages = relatedPosts.map(relatedPost => {
            let imageData = null;
            if (relatedPost.image && relatedPost.image.data) {
                imageData = `data:${relatedPost.image.contentType};base64,${relatedPost.image.data.toString('base64')}`;
            }
            return {
                ...relatedPost._doc,
                imageData
            };
        });

        res.json(relatedPostsWithImages);
    } catch (err) {
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
        let imageData = null;
        if (post.image && post.image.data) {
            imageData = `data:${post.image.contentType};base64,${post.image.data.toString('base64')}`;
        }
        const postWithImage = {
            ...post._doc,
            imageData
        };
        console.log('Post found:', postWithImage);
        res.json(postWithImage);
    } catch (err) {
        console.error('Error fetching post:', err);
        res.status(500).json({ message: err.message });
    }
});

//! Create new post with image
router.post('/', upload.single('image'), async (req, res) => {
    console.log('POST request received to create a new post');
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            date: Date.now(),
            category: req.body.category,
            image: req.file ? {
                data: fs.readFileSync(path.join(__dirname, '../uploads/' + req.file.filename)),
                contentType: req.file.mimetype
            } : undefined
        });

        const newPost = await post.save();
        console.log('New post created:', newPost);


        if (req.file) {
            fs.unlinkSync(path.join(__dirname, '../uploads/' + req.file.filename));
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
