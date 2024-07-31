import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true },
    imageUrl: { type: String },
    likes: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    category: { type: String, required: true }
});

const Post = mongoose.model('Post', postSchema);

export default Post;