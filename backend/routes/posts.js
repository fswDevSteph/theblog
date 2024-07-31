import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import Post from '../models/Post.js';
import mongoose from 'mongoose';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/featured', async (req, res) => {
    try {
        const featuredPost = await Post.findOne({ featured: true });
        if (!featuredPost) {
            return res.status(404).json({ message: 'No featured post found' });
        }
        res.json(featuredPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid post ID format' });
    }
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/:id/related', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid post ID format' });
    }
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const relatedPosts = await Post.find({ category: post.category, _id: { $ne: post._id } });
        res.json(relatedPosts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/', upload.array('imageUrl', 5), async (req, res) => {
    try {
        const imageUrl = req.files ? req.files.map(file => ({
            path: file.path,
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

        if (req.files) {
            req.files.forEach(file => {
                fs.unlinkSync(file.path);
            });
        }

        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: 'Error creating post', error: error.message });
    }
});

router.post('/:id/like', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid post ID format' });
    }
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

router.delete('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid post ID format' });
    }
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
});

export default router;
